import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components imports 
import { AuthenticateComponent} from './components/authenticate/authenticate.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgetpasswordComponent} from './components/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent} from './components/resetpassword/resetpassword.component';
import { ChatComponent} from './components/chat/chat.component';

const routes: Routes = [
  {path: '', component: AuthenticateComponent},
  {path: 'home',  loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)},
  {path: 'register', component: RegisterComponent},
  {path: 'forget-password', component: ForgetpasswordComponent},
  {path: 'reset-password', component: ResetpasswordComponent},
  {path: 'chat', component: ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
