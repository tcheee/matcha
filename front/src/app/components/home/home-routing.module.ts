import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProfileComponent } from '../profile/profile.component';
import { HistoryComponent} from '../history/history.component';
import { MatchComponent } from '../match/match.component';
import { ChatComponent} from '../chat/chat.component'

// guards
import { IsSignedGuardGuard} from '../../guards/is-signed-guard.guard';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [IsSignedGuardGuard],
      },
      {
        path : 'history',
        component: HistoryComponent,
        canActivate: [IsSignedGuardGuard],
      },
      {
        path : 'match',
        component : MatchComponent,
        canActivate: [IsSignedGuardGuard],
      },
      {
        path: 'chat',
        component: ChatComponent,
        canActivate: [IsSignedGuardGuard],
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
