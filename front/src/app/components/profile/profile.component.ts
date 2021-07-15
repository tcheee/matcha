import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

//ngrx imports
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

// store imports
import {
  SelfSelectors,
  RootStoreState,
} from '../../root-store';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

  selfData: Observable<any>;

  constructor(
    private router: Router,
    private store$: Store<RootStoreState.RootState>,
    ) { }

  ngOnInit(): void {
    this.selfData = this.store$.select(SelfSelectors.getAllStateData);
    this.selfData.subscribe(res => console.log(res))
  }
}
