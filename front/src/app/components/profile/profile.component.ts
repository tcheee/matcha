import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

//ngrx imports
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

// chips 
import {MatChipInputEvent} from '@angular/material/chips';
// geo
import { LocationService} from '../../services/location.service';


// store imports
import {
  SelfSelectors,
  RootStoreState,
} from '../../root-store';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

  lat : string = "";
  lng : string = "";
  ipAdress : string = "";
  selfData: Observable<any>;
  updateForm : FormGroup;
  updateFormConfirm : any;
  interests: Array<any>;
  submitted = false;
  selectable = true;
  removable = true;
  addOnBlur = true;
  gender : string;
  orientation : string;
  image : string;
  geolocalize : string;

  @ViewChild('fileInput')
  fileInput : any;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  file: File | null = null;
  constructor(
    private router: Router,
    private store$: Store<RootStoreState.RootState>,
    private formBuilder: FormBuilder,
    private location: LocationService,
    ) { }


  ngOnInit(): void {
    // location
    this.location.getIpAddress().subscribe((res: any)  => {
      this.ipAdress = res['ip'],
      this.location.getGEOLocation(this.ipAdress).subscribe((res: any) => {
        this.lat = res['latitude'];
        this.lng = res['longitude'];
        console.log(this.lat);
        console.log(this.lng);
      })
    }),

    this.store$.select(SelfSelectors.getAllStateData).subscribe(
      res => {
        console.log(res.image)
        console.log(res.gender);
        console.log(res.orientation)
        this.image =  "data:image/jpeg;base64," + res.image;
        this.gender = res.gender;
        this.orientation = res.orientation;
        this.interests = res.interests;
        this.updateForm = this.formBuilder.group({
          email: [res.mail , [Validators.email, Validators.required]],
          firstName: [res.first_name, Validators.required],
          lastName: [res.last_name, Validators.required],
          age: [res.age, [Validators.required, Validators.pattern("^[0-9]*$")]],
          gender: [ , Validators.required],
          orientation: [ null , Validators.required],
          interest: [ null, Validators.required],
          biography: [res.biography, Validators.required ],
          geolocalize: ['', ],
      },
    );
      })
  }
  onSubmit(){
    console.log(this.updateForm.value);
    this.updateFormConfirm = this.updateForm.value;
    if (this.file){
    this.updateFormConfirm.img = this.file;
    }
    if (this.updateFormConfirm.geolocalize && this.updateFormConfirm.geolocalize === 1){
      this.updateFormConfirm.lat = this.lat;
      this.updateFormConfirm.lng = this.lng;
    }


  }
     onReset() {
      this.submitted = false;
      this.updateForm.reset();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      if (value[0].includes("#")){
        this.interests.push({name: value});
      }
      else{
        alert("you must have an # on the first character")
      }
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(interest: any): void {
    const index = this.interests.indexOf(interest);

    if (index >= 0) {
      this.interests.splice(index, 1);
    }
  }

  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

  onChangeFileInput(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
  }
}
