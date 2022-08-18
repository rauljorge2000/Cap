import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardianGuard implements CanActivateChild {

  constructor(private router : Router, private auth: AuthService) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(getAuth().currentUser == null) {
      this.router.navigate(['home']);
      alert("No se puede acceder al chat sin iniciar sesión.");
      return false;
    }
    return true;
  }
}
