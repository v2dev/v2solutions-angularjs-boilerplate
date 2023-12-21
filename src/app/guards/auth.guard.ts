import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { map, take } from 'rxjs';


export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.isLoggedIn.pipe(
    take(1),
    map((isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        router.navigate(['login']);
        return false;
      }
      return true;
    })
  );
}