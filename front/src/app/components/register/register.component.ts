import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// chips 
import {MatChipInputEvent} from '@angular/material/chips';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  interests: Array<any> = [
    {name: '#hiking'},
    {name: '#food'},
    {name: '#surfing'},
  ];
  constructor(
    private formBuilder: FormBuilder,
      ) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          email: ['', [Validators.email, Validators.required]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          age: ['', [Validators.required]],
          location: ['', Validators.required],
          gender: ['', Validators.required],
          orientation: ['', Validators.required],
          interest: ['', Validators.required],
          biography: ['', ],
          img1: ['', Validators.required],
      },
    );
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    console.log(this.interests)
    console.log(this.registerForm.value)
      this.submitted = true;
      

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      // display form values on success
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.interests.push({name: value});
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

}
