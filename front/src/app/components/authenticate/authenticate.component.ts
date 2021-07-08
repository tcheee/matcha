import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService} from '../../services/auth-service.service'
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
    this.authservice.login(this.form.value).subscribe(result => console.log(result))
  }

  registerPage(){
    this.router.navigate(['register'])

  }
}