import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

//ngrx imports
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take, first } from 'rxjs/operators';

// chips 
import {MatChipInputEvent} from '@angular/material/chips';
// geo
import { LocationService} from '../../services/location.service';
// services
import { AuthServiceService} from '../../services/auth-service.service'

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
  interests: string [];
  submitted = false;
  selectable = true;
  removable = true;
  addOnBlur = true;
  gender : string;
  orientation : string;
  image : string;
  image1 : string;
  image2 : string;
  image3 : string;
  geolocalize : string;

  @ViewChild('fileInput')
  fileInput : any;
  @ViewChild('fileInput1')
  fileInput1: any;
  @ViewChild('fileInput2')
  fileInput2: any;
  @ViewChild('fileInput3')
  fileInput3: any;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  file: File | null = null;
  file1: File | null = null;
  file2: File | null = null;
  file3: File | null = null;
  constructor(
    private router: Router,
    private store$: Store<RootStoreState.RootState>,
    private formBuilder: FormBuilder,
    private location: LocationService,
    private authservice : AuthServiceService
    ) { }


  ngOnInit(): void {
    // location
 //   this.location.getIpAddress().subscribe((res: any)  => {
 //     this.ipAdress = res['ip'],
 //     this.location.getGEOLocation(this.ipAdress).subscribe((res: any) => {
//        this.lat = res['latitude'];
//        this.lng = res['longitude'];
 //     })
 //   }),

    this.store$.select(SelfSelectors.getAllStateData).pipe(first()).subscribe(
      res => {
        this.image =  "data:image/jpeg;base64," + res.image;
        this.image1 = res.image1.length > 0 ? "data:image/jpeg;base64," + res.image1 : "", 
        this.image2 = res.image2.length > 0 ? "data:image/jpeg;base64," + res.image2 : "", 
        this.image3 = res.image3.length > 0 ? "data:image/jpeg;base64," + res.image3 : "", 
        this.lat = res.lat;
        this.lng = res.lng;
        this.interests = res.interests.split(',');
        this.updateForm = this.formBuilder.group({
          email: [res.mail , [Validators.email, Validators.required]],
          firstName: [res.first_name, Validators.required],
          lastName: [res.last_name, Validators.required],
          age: [res.age, [Validators.required, Validators.pattern("^[0-9]*$")]],
          gender: [ res.genre, Validators.required],
          orientation: [ res.orientation , Validators.required],
          interest: [ '', ],
          biography: [res.biography, Validators.required ],
          geolocalize: ['', ],
          lat: [''],
          lng: [''],
      },
    );
      })
  }
  onSubmit(){
    console.log(this.updateForm.value);

    this.updateFormConfirm = this.updateForm.value;
    if ( !this.updateForm.valid || this.interests.length == 0) {
      console.log(this.updateForm.valid)
          return;
      }
 //   if (this.updateFormConfirm.geolocalize && this.updateFormConfirm.geolocalize === 1){
 //     this.updateFormConfirm.lat = this.lat;
 //     this.updateFormConfirm.lng = this.lng;
 //   }
    this.file instanceof File ? this.updateFormConfirm['img'] = this.file : null ;
    this.file1 instanceof File ? this.updateFormConfirm['img1'] = this.file1 : null ;
    this.file2 instanceof File ? this.updateFormConfirm['img3'] = this.file2 : null ;
    this.file3 instanceof File ? this.updateFormConfirm['img3'] = this.file3 : null ;
    this.updateFormConfirm.interest = this.interests;
    this.updateFormConfirm.lat = this.lat;
    this.updateFormConfirm.lng = this.lng;
    console.log(this.updateFormConfirm)
    this.authservice.update(this.updateFormConfirm);
    

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
        this.interests.push(value);
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
  onClickFileInputButton1(): void {
    this.fileInput1.nativeElement.click();
  }
  onClickFileInputButton2(): void {
    this.fileInput2.nativeElement.click();
  }
  onClickFileInputButton3(): void {
    this.fileInput3.nativeElement.click();
  }

  onChangeFileInput(): void {
    console.log("laa")
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
  }
  onChangeFileInput1(): void {
    const files1: { [key: string]: File } = this.fileInput1.nativeElement.files;
    this.file1 = files1[0];
  }
  onChangeFileInput2(): void {
    const files2: { [key: string]: File } = this.fileInput2.nativeElement.files;
    this.file2 = files2[0];
  }
  onChangeFileInput3(): void {
    const files3: { [key: string]: File } = this.fileInput3.nativeElement.files;
    this.file3 = files3[0];
  }
}
