import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from './http.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private _http: HttpService, private _router: Router) { }

  canActivate(): boolean{
    if(this._http.guard_loggedIn()){
      return true
    }
    else{
      this._router.navigate(['/login']);
      return false
    }
  }
  
}
