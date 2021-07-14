import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';

// component
import { HomeComponent} from './home.component';
import { ProfileComponent} from '../profile/profile.component';
import { HistoryComponent} from '../history/history.component';
import { MatchComponent } from '../match/match.component';

// material module
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [ HomeComponent, ProfileComponent, HistoryComponent, MatchComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
      // NG Material Modules
      MatSidenavModule,
      MatIconModule,
      MatListModule,
      MatToolbarModule,
      MatCardModule,
      MatButtonModule,
  ]
})
export class HomeModule { }
