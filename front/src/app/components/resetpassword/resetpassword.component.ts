import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService} from '../../services/auth-service.service'

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})

export class ResetpasswordComponent implements OnInit {
  form! : FormGroup;
  formSubmitAttempt! : boolean;
  public uuid: string = ''!;

  constructor(
    private fb: FormBuilder,
    private router : Router,
    private authservice : AuthServiceService,
    private route: ActivatedRoute
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

    this.uuid = this.route.snapshot.queryParamMap.get('uuid') || '';
  }

  onSubmit() {
    if (this.form.invalid)
      return ;
    const data = {uuid: this.uuid, password: this.form.value.password}
    this.authservice.changePassword(data)
  };


}
