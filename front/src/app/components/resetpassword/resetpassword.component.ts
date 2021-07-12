import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService} from '../../services/auth-service.service'

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})

export class ResetpasswordComponent implements OnInit {
  form! : FormGroup;
  formSubmitAttempt! : boolean;
  public href: string = "";

  constructor(
    private fb: FormBuilder,
    private router : Router,
    private authservice : AuthServiceService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(40),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
        ]],
    });

    this.href = this.router.url;
    console.log(this.href);
  }

  onSubmit() {
    this.authservice.resetPassword(this.form.value)
  };


}
