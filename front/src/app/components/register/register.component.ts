import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

// chips 
import {MatChipInputEvent} from '@angular/material/chips';
// geo
import { LocationService} from '../../services/location.service';

// services
import { AuthServiceService} from '../../services/auth-service.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  lat : string = "";
  lng : string = "";
  registerForm: FormGroup;
  registerFormConfirm : any;
  submitted = false;
  selectable = true;
  removable = true;
  addOnBlur = true;
  ipAdress : string = "";
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  interests: Array<any> = [
    {name: '#hiking'},
    {name: '#food'},
    {name: '#surfing'},
  ];

  @ViewChild('fileInput')
  fileInput : any;

  file: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authservice : AuthServiceService,
    private location: LocationService,
      ) { }

  ngOnInit() {
    this.location.getIpAddress().subscribe((res: any)  => {
      this.ipAdress = res['ip'],
      this.location.getGEOLocation(this.ipAdress).subscribe((res: any) => {
        this.lat = res['latitude'];
        this.lng = res['longitude'];
        console.log(this.lat);
        console.log(this.lng);
      })
    }),
      this.registerForm = this.formBuilder.group({
          email: ['', [Validators.email, Validators.required]],
          password: ['', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
            Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
            ]],
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          age: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
          gender: ['', Validators.required],
          orientation: ['', Validators.required],
          interest: ['', Validators.required],
          biography: ['', ],
          img: ['', Validators.required],
          lng: [''],
          lat: ['']
      },
    );

  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
      // (when we choose a file the submit button is trigerred idk why)
      if (!this.file) {
          return;
      }
      this.registerFormConfirm = this.registerForm.value;
      this.registerFormConfirm.interest = this.interests;
      this.registerFormConfirm.img = this.file;
      this.registerFormConfirm.lat = this.lat;
      this.registerFormConfirm.lng = this.lng;
     console.log(this.registerFormConfirm)
     console.log(this.registerFormConfirm.lat)
     console.log(this.registerFormConfirm.lng)
     console.log(this.registerFormConfirm.interest)
      // send to back
      this.authservice.register(this.registerFormConfirm);
      // display form values on success
     // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
     console.log(this.registerFormConfirm)
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
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
