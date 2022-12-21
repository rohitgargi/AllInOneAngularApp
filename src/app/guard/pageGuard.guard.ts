import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class PageGuard implements CanActivate {
  
    constructor(private router: Router){
  
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        //page3Status
        if(sessionStorage.getItem('page3Status')==='1'){
            return true;
        }else{
            return this.router.createUrlTree(['page1'])
        }

    }

    
  }
