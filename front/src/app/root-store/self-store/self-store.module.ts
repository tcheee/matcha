// angular imports
import { NgModule } from '@angular/core';

// ngrx imports
import { StoreModule } from '@ngrx/store';

// store imports
import { key } from './state';
import { reducers } from './reducers';


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(key, reducers),
  //  EffectsModule.forFeature([MainEffects], )
  ]
})
export class SelfStoreModule { }
