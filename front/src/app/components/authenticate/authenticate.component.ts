import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService} from '../../services/auth-service.service'
import { socketService} from '../../services/socket-service.service'
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
    private socketservice: socketService
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
        this.socketservice.getData(this.form.value.email)
        this.router.navigate(['/home'])
      } else {
        /// wait for toms to send a bad result
        alert("You're email or password do not exist")
        return ;
      }
    })
  };

  forgetPasswordPage(){
    this.router.navigate(['forget-password'])
  }

  registerPage(){
    this.router.navigate(['register'])

  }
}