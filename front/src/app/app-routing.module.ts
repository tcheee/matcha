import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components imports 
import {
  AuthenticateComponent
} from './components/authenticate/authenticate.component';
import {RegisterComponent} from './components/register/register.component';
const routes: Routes = [
  {path: 'authenticate', component: AuthenticateComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
