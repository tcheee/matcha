import { Component, OnInit,  ViewChild  } from '@angular/core';
import { Router} from '@angular/router';
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
  SelfAction,
} from '../../root-store'

// service import
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  selfData$ : Observable<any>;
  selfData : any;
  userData$ : Observable<any>;
  displayedColumns: string[] = ['notification_type', 'from_mail', 'creation_time'];
  dataSource : MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private store$: Store<RootStoreState.RootState>,
    private authservice : AuthServiceService,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.selfData$ = this.store$.select(SelfSelectors.getAllStateData);
    this.selfData$.pipe(first()).subscribe(res => this.selfData = res);
    this.dataSource = new MatTableDataSource<any>(this.selfData.notifications);
    this.store$.select(SelfSelectors.mail).pipe(first()).subscribe(
      res => 
      this.authservice.removeNotification(res))
  }

  routeToUser(row : any){
    let tab;
    this.store$.select(UsersSelector.getAllUsersStateData).subscribe(
      (res : any)   => {
          tab = [...res.users]
          tab.forEach((item : any) => {
            if (item.mail === row.from_mail){
              console.log(item.id)
              this.router.navigate(['home/match/' + item.id])
            }
          })
      }
    )
  }

}
