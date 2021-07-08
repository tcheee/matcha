import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ngrx imports
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
        // ngrx modules
        StoreModule.forRoot({}, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictStateSerializability: true,
            strictActionImmutability: true,
            strictActionSerializability: false,
            strictActionWithinNgZone: true,
          }
        }),
        StoreDevtoolsModule.instrument({
          maxAge: 25,
          logOnly: false,
        }),
        EffectsModule.forRoot([]),
  ]
})
export class RootStoreModule { }
