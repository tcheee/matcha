import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';

// component
import { HomeComponent} from './home.component';
import { ProfileComponent} from '../profile/profile.component';
import { HistoryComponent} from '../history/history.component';
import { MatchComponent } from '../match/match.component';
import { MatchProfileComponent } from '../match-profile/match-profile.component';
import { WelcomeComponent} from '../welcome/welcome.component';

// material module
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatChipsModule } from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSliderModule} from '@angular/material/slider';
// forms
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { fromEventPattern } from 'rxjs';
@NgModule({
  declarations: [ HomeComponent, ProfileComponent, HistoryComponent, MatchComponent, MatchProfileComponent, WelcomeComponent],
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
      MatTooltipModule,
      MatBadgeModule,
      MatRadioModule,
      MatSelectModule,
      ReactiveFormsModule,
      FormsModule,
      MatInputModule,
      MatFormFieldModule,
      MatChipsModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatSliderModule,

  ]
})
export class HomeModule { }
