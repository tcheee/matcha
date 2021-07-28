import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ViewChild, Self  } from '@angular/core';
//ngrx imports
import { Store } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import { first } from 'rxjs/operators'
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Sort, MatSort } from '@angular/material/sort';
// store imports
import {
  SelfSelectors,
  RootStoreState,
  UsersSelector,
} from '../../root-store';
import { MatSliderChange } from '@angular/material/slider';

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
  displayedColumns: string[] = ['first_name', 'last_name', 'age', 'image', 'interests', 'genre', 'fame', 'distance'];
  tab: any;
  blocks$: Observable<any>;
  blocks: any;
  dataSource : MatTableDataSource<any>;
  orientation : string;
  sortedData : any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  sortAgeValue : number | null = 0;
  sortmilesValue : number | null = 0;
  sortFameValue : number | null = 0;
  sortInterestValue : number | null = 0;

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

    this.tab = [...this.usersData.users];
    if(this.selfData.blocks){
      this.tab.forEach((item : any, index : any) => {
        this.selfData.blocks.map((res : any) => {
          if (item.mail === res.target){
            this.tab.splice(index, 1)
          }
        })
      })
    }


    if(this.selfData.orientation !== "Bisexual"){
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
    this.sortedData = this.tab
    this.dataSource = new MatTableDataSource<any>(this.tab);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
  sortAge(event: MatSliderChange){
    if(this.dataSource){
    this.sortAgeValue = event.value
      this.dataSource.filterPredicate = (data : any ,filter) => {
        if (event.value !== 0 && this.sortmilesValue === 0){
          return (data.age < event.value!)
        }
        if (event.value !== 0 && this.sortmilesValue !== 0){
          return (data.age < event.value! && data.distance < this.sortmilesValue!)
        }
        else 
          return true
      }
      this.dataSource.filter = "" + Math.random()
    }
    if (this.dataSource.paginator) {
      // reset the paginator to the first page.
      this.dataSource.paginator.firstPage();
    }
  }
  sortMiles(event: MatSliderChange){
    console.log(event.value)
      this.sortmilesValue = event.value;
      this.dataSource.filterPredicate = (data : any ,filter) => {
        if (event.value !== 0 && this.sortAgeValue === 0){
          return (data.distance < event.value!)
        }
        if (event.value !== 0 && this.sortAgeValue !== 0){
          return (data.distance < event.value!&& data.age < this.sortAgeValue!)
        }
        else 
          return true
      }
      this.dataSource.filter = "" + Math.random()
      
    if (this.dataSource.paginator) {
      // reset the paginator to the first page.
      this.dataSource.paginator.firstPage();
    }
  }

  sortFame(event: MatSliderChange){
      this.sortFameValue = event.value;
      this.dataSource.filterPredicate = (data : any ,filter) => {
        if (event.value !== 0 && this.sortAgeValue === 0 && this.sortmilesValue === 0){
          return (data.fame < event.value!)
        }
        if (event.value !== 0 && this.sortAgeValue !== 0 && this.sortmilesValue === 0){
          return (data.fame < event.value! && data.age < this.sortAgeValue!)
        }
        if (event.value !== 0 && this.sortAgeValue === 0 && this.sortmilesValue !== 0){
          return (data.fame < event.value! && data.distance < this.sortmilesValue!)
        }
        if (event.value !== 0 && this.sortAgeValue !== 0 && this.sortmilesValue !== 0){
          return (data.fame < event.value! && data.distance < this.sortmilesValue! && data.age < this.sortAgeValue!)
        }
        else 
          return true
      }
      this.dataSource.filter = "" + Math.random()
      
    if (this.dataSource.paginator) {
      // reset the paginator to the first page.
      this.dataSource.paginator.firstPage();
    }
  }

  sortInterest(event: MatSliderChange){
    this.sortFameValue = event.value;
    this.dataSource.filterPredicate = (data : any ,filter) => {
      if (event.value !== 0 && this.sortAgeValue === 0 && this.sortmilesValue === 0){
        return (data.fame < event.value!)
      }
      if (event.value !== 0 && this.sortAgeValue !== 0 && this.sortmilesValue === 0){
        return (data.fame < event.value! && data.age < this.sortAgeValue!)
      }
      if (event.value !== 0 && this.sortAgeValue === 0 && this.sortmilesValue !== 0){
        return (data.fame < event.value! && data.distance < this.sortmilesValue!)
      }
      if (event.value !== 0 && this.sortAgeValue !== 0 && this.sortmilesValue !== 0){
        return (data.fame < event.value! && data.distance < this.sortmilesValue! && data.age < this.sortAgeValue!)
      }
      else 
        return true
    }
    this.dataSource.filter = "" + Math.random()
    
  if (this.dataSource.paginator) {
    // reset the paginator to the first page.
    this.dataSource.paginator.firstPage();
  }
}
}