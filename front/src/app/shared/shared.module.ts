import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// material imports
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule} from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTreeModule } from '@angular/material/tree';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatCommonModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

// components
import { AuthenticateComponent } from '../components/authenticate/authenticate.component';
import { RegisterComponent } from '../components/register/register.component';

// forms 
import { ReactiveFormsModule } from '@angular/forms'

const COMPONENT = [
  AuthenticateComponent,
  RegisterComponent,
];

const MATERIAL_MODULES = [
  MatCardModule,
  MatDividerModule,
  MatGridListModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatTableModule,
  MatIconModule,
  MatListModule,
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatMenuModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatBadgeModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatStepperModule,
  MatAutocompleteModule,
  MatExpansionModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatTreeModule,
  MatChipsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCommonModule,
  MatRadioModule,
  BrowserAnimationsModule,
];


@NgModule({
  declarations: [
    ... COMPONENT,
  ],
  imports: [
    CommonModule,
    ... MATERIAL_MODULES,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    ... MATERIAL_MODULES,
    ... COMPONENT,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SharedModule { }
