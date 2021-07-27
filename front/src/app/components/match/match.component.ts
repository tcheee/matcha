import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ViewChild, Self  } from '@angular/core';
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
  displayedColumns: string[] = ['first_name', 'last_name', 'image', 'interests', 'genre', 'fame', 'distance'];
  tab: any;
  blocks$: Observable<any>;
  blocks: any;
  dataSource : MatTableDataSource<any>;
  orientation : string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private store$: Store<RootStoreState.RootState>,

  ) { }

  ngOnInit(): void {
    // Suscribe + assign value 
    this.selfData$ = this.store$.select(SelfSelectors.getAllStateData);
    this.selfData$.pipe(first()).subscribe(res => this.selfData = res);
    this.usersData$ = this.store$.select(UsersSelector.getAllUsersStateData);
    this.usersData$.pipe(first()).subscribe(res => this.usersData = res);
  //  this.blocks$ = this.store$.select(SelfSelectors.)
  //  if (this.selfData.blocks.lenght > 0){
  //    this.usersData.users.filter((res : any) => this.selfData.blocks.includes(res.mail))
  //  }

  // SORT ARRAY PHASE
    if(this.selfData.orientation === 'Homosexual')
      if(this.selfData.genre === 'Man')
        this.orientation = "Man"
      else
        this.orientation = "Woman"
    if(this.selfData.orientation === 'Heterosexual')
      if(this.selfData.genre === 'Man')
        this.orientation = "Woman"
      else
        this.orientation = "Man"

    console.log(this.orientation)
    this.tab = [...this.usersData.users];
    if(this.selfData.orientation !== "Bisexual"){
      console.log("pass")
      this.tab = this.tab.sort(((a : any, b : any) => {
        if(a.genre != this.orientation && b.genre === this.orientation){
          return 1;
        }
        if(a.genre === this.orientation && b.genre != this.orientation){
          return -1;
        }
        return 0;
      }))
  }

    this.tab = this.tab.sort(((a : any, b : any) => {
      if (a.genre === b.genre)
        return a.fame > b.fame ? -1 : 1
      else
        return 0;
      }))
    this.tab = this.tab.sort(((a: any, b: any) => {
      if (a.fame === b.fame && a.genre === b.genre){
        console.log(a.distance)
        console.log(b.distance)
        return a.distance > b.distance ? 1 : -1
      }
      else {
        return 0;
      }
    }))

    // change tab for images
    this.tab = this.tab.map(( item : any ) => ({
            ...item,
            realImage : "data:image/jpeg;base64," + item.image
        })),
    this.dataSource = new MatTableDataSource<any>(this.tab);
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
