import { Injectable, } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { first, } from 'rxjs/operators';
//ngrx imports
import { Store } from '@ngrx/store';
// store imports
import {
  RootStoreState,
  SelfSelectors,
} from '../root-store';
@Injectable({
  providedIn: 'root'
})
export class IsSignedGuardGuard implements CanActivate {
  constructor(
    private store$: Store<RootStoreState.RootState>,
    private router: Router,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      let x : boolean = true;
      this.store$.select(SelfSelectors.isLogged).pipe(first()).subscribe(
        res => {
          x = res;
          }
    )
    if (x === true){
      return true;
    }
    return this.router.navigate([])
    }
  }
