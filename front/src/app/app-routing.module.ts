import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components imports 
import { AuthenticateComponent} from './components/authenticate/authenticate.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgetpasswordComponent} from './components/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent} from './components/resetpassword/resetpassword.component';
const routes: Routes = [
  {path: '', component: AuthenticateComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forget-password', component: ForgetpasswordComponent},
  {path: 'reset-password', component: ResetpasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
