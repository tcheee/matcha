import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components imports 
import {
  AuthenticateComponent
} from './components/authenticate/authenticate.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgetpasswordComponent} from './components/forgetpassword/forgetpassword.component';
const routes: Routes = [
  {path: '', component: AuthenticateComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forget-password', component: ForgetpasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
