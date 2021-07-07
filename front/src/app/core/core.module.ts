import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// store imports
import { RootStoreModule } from '../root-store/root-store.module';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forRoot([]),
    RootStoreModule,
  ]
})
export class CoreModule { }
