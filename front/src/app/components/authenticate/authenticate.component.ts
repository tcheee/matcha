import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService} from '../../services/auth-service.service'
import { socketService} from '../../services/socket-service.service'
import {MatSnackBar} from '@angular/material/snack-bar';

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
    private authservice : AuthServiceService,
    private socketservice: socketService,
    private _snackBar: MatSnackBar,
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
    this.authservice.login(this.form.value).subscribe(result => {
      if (result.message = "User is connected"){
        this.socketservice.setUpSocketConnexion(result.jwt, this.form.value['email'])
        this.socketservice.getData(this.form.value.email)
      }},
      (error ) => {
        this._snackBar.open(error.error.message, undefined, {duration : 1500 })
      })
    };

  forgetPasswordPage(){
    this.router.navigate(['forget-password'])
  }

  registerPage(){
    this.router.navigate(['register'])

  }
}