import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, mergeMap } from 'rxjs';
import { AppKeys, AppRoutes } from 'src/app/core/constants/appSettings';
import { EncryptStorageService } from 'src/app/core/services/encrypt-storage.service';
import { NewUserModel, OtpModel, RequestModel, ResetPasswordModel } from 'src/app/modules/auth/login/login.model';
import { HttpService } from './http.service';
import { ApiUrl } from 'src/app/core/constants/apiUrl.constant';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthorized = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly storageService: EncryptStorageService,
    private readonly router: Router,
    private readonly httpService: HttpService,
    private socialAuthService: SocialAuthService
  ) {
    this.onStorageChange();
    window.addEventListener('storage', this.handleStorageEvent);
  }

  handleStorageEvent = (event: StorageEvent): void => {
    this.onStorageChange();
  };

  onStorageChange() {
    if (this.storageService.getLocalStorageItem(AppKeys.authToken)) {
      this.isAuthorized.next(true);
    } else {
      this.isAuthorized.next(false);
    }
  }

  login(loginObj: RequestModel) {
    return this.httpService.post(`${ApiUrl.login}`, loginObj);
  }

  socialLogin(): Observable<any> {
    return this.socialAuthService.authState.pipe(map((res: SocialUser) => res), mergeMap(data => {
      const obj = {
        token: data.idToken,
      }
      return this.httpService.post(`${ApiUrl.socialLogin}`, obj)
    }));
  }

  verifyOtp(otp: OtpModel) {
    return this.httpService.post(`${ApiUrl.otp}`, otp);
  }

  register(user: NewUserModel) {
    return this.httpService.post(`${ApiUrl.signup}`, user);
  }

  forgotPassword(formObject: Object) {
    return this.httpService.post(`${ApiUrl.forgotPassword}`, formObject);
  }

  resetPassword(data: ResetPasswordModel) {
    return this.httpService.post(`${ApiUrl.resetPassword}`, data);
  }

  logOut() {
    this.storageService.clearLocalStorageByKey(AppKeys.authToken);
    this.socialAuthService.signOut();
    this.router.navigateByUrl(`/${AppRoutes.login}`);
  }

  getAccessControls() {
    return [
      {
        module_name: '',
        create_action: true,
        view_action: true,
        update_action: true,
        delete_action: true,
        print_QR: true,
      },
    ];
  }
}
