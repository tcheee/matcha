import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { catchError, retry, switchMap } from 'rxjs/operators';
// chips 
import {MatChipInputEvent} from '@angular/material/chips';

// services
import { AuthServiceService} from '../../services/auth-service.service'
// snackbar
import {MatSnackBar} from '@angular/material/snack-bar';

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
  interests: string[] = [
    '#hiking',
    '#food',
    '#surfing',
  ];

  @ViewChild('fileInput')
  fileInput : any;

  file: File | null = null;
  userIP : any;
  constructor(
    private formBuilder: FormBuilder,
    private authservice : AuthServiceService,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
      ) { }

  ngOnInit() {
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
          interest: ['', ],
          biography: ['', Validators.required],
          img: ['', ],
          is_geolocated: [''],
      },
    );
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
      // (when we choose a file the submit button is trigerred idk why)
      if (!this.file || !this.registerForm.valid || this.interests.length <= 0) {
      this._snackBar.open("The form is not Valid, Please complete the red field(s)", undefined, {duration : 1500 })
          return;
      }
      this.http.get('https://jsonip.com')
      .pipe(
        switchMap((value:any) => {
        this.userIP = value.ip;
      //  let url = `http://api.ipstack.com/${value.ip}?access_key=ea257a63d9a9bd1011ab7fb771839e07`
        return this.http.get(`https://api.ipstack.com/${value.ip}?access_key=ea257a63d9a9bd1011ab7fb771839e07`);
        })
      ).subscribe(
        (value:any) => {
        console.log(value);
        this.registerFormConfirm = this.registerForm.value;
        this.registerFormConfirm['lat'] = value.latitude;
        this.registerFormConfirm['lng'] = value.longitude;
        this.registerFormConfirm.interest = this.interests;
        this.registerFormConfirm.img = this.file;
        this.authservice.register(this.registerFormConfirm);
        },
        err => {
          this._snackBar.open("You have to start with '#' get Location", undefined, {duration : 1500 })
        }
      );
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
        this.interests.push(value);
      }
      else{
        this._snackBar.open("You have to start with '#' character", undefined, {duration : 1500 })
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
