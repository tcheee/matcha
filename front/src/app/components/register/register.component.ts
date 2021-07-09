import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

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
          interest: ['', ],
          biography: ['', ],
      },
    );
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    console.log("dddd")
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

}
