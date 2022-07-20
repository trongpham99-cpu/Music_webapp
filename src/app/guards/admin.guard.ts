import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private AuthService: AuthService, private Router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve) => {
      if (!this.AuthService._token) {
        location.href = "/";
        resolve(false);
        return;
      }
      this.AuthService.getProfile()?.subscribe((res: any) => {
        if (res.role === 'admin') {
          resolve(true);
          return;
        }
        location.href = "/";
        resolve(false);
        return;
      })
    })

  }

}
