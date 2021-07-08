import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})

export class AuthenticateComponent implements OnInit {
  form! : FormGroup;
  formSubmitAttempt! : boolean;

  constructor(
    private fb: FormBuilder,
    private router : Router,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
  }

  onSubmit() {
    console.log("lllllllllll")
    this.formSubmitAttempt = true;
  }

  registerPage(){
    this.router.navigate(['register'])
  }
}