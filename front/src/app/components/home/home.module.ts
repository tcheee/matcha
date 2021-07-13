import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent} from './home.component';
import { ProfileComponent} from '../profile/profile.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card'
import { fromEventPattern } from 'rxjs';

@NgModule({
  declarations: [ HomeComponent, ProfileComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
      // NG Material Modules
      MatSidenavModule,
      MatIconModule,
      MatListModule,
      MatToolbarModule,
      MatCardModule,
  ]
})
export class HomeModule { }
