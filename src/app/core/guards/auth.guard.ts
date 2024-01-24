import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppKeys, AppRoutes } from '../constants/appSettings';
import { EncryptStorageService } from '../services/encrypt-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private readonly storageService: EncryptStorageService,
    private readonly router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.storageService.getLocalStorageItem(AppKeys.authToken);
    if (token) {
      return true;
    }
    this.router.navigate([AppRoutes.login]);
    return false;
  }
}
