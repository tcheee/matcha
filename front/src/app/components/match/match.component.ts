import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ViewChild  } from '@angular/core';
//ngrx imports
import { Store } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import { first } from 'rxjs/operators'
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
// store imports
import {
  SelfSelectors,
  RootStoreState,
  UsersSelector,
} from '../../root-store';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchComponent implements OnInit, AfterViewInit {
  selfData$ : Observable<any>;
  selfData : any;
  usersData$ : Observable<any>;
  usersData : any;
  displayedColumns: string[] = ['first_name', 'last_name', 'interests', 'genre', 'fame'];
  dataSource : MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private store$: Store<RootStoreState.RootState>

  ) { }

  ngOnInit(): void {
    this.selfData$ = this.store$.select(SelfSelectors.getAllStateData);
    this.selfData$.pipe(first()).subscribe(res => this.selfData = res);
    this.usersData$ = this.store$.select(UsersSelector.getAllStateData);
    this.usersData$.pipe(first()).subscribe(res => this.usersData = res);
    console.log(this.usersData);
    this.dataSource = new MatTableDataSource<any>(this.usersData.users);
  }

  applyFilter(event: Event) {
    // get the filter value
    const filterValue = (event.target as HTMLInputElement).value;

    // apply it to the dataSource.
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        // reset the paginator to the first page.
        this.dataSource.paginator.firstPage();
      }
    }
  }

}
