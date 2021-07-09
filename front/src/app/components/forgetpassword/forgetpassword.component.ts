import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService} from '../../services/auth-service.service'

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
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
    });
  }

  onSubmit() {
    this.authservice.resetPassword(this.form.value)
  };


}
