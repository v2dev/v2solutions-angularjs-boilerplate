import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppKeys, AppRouts } from 'src/app/core/constants/appSettings';
import { EncryptStorageService } from 'src/app/core/services/encrypt-storage.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { RequestModel, ResponseModel, UserModel } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loading = false;
  userName = '';
  password = '';
  authInfo: RequestModel = new RequestModel();
  termsAndCondition = false;
  isChecked = false;
  constructor(
    private readonly router: Router,
    private readonly storageService: EncryptStorageService,
    private readonly authService: AuthService,
    private readonly commonService: CommonService,
  ) {
    this.authService.isAuthorized.next(false);
    this.storageService.clearLocalStorageByKey(AppKeys.authToken);
  }

  login() {
    this.loading = true;
    this.authInfo.email = this.userName;
    this.authInfo.password = this.password;
    this.authService.login(this.authInfo).subscribe({
      next: (res: any) => {
        this.storageService.setLocalStorageItem(AppKeys.authToken, res.token);
        this.loading = false;
        this.router.navigateByUrl(`/${AppRouts.dashboard}`);
      },
      error: (err: any) => {
        this.loading = false;
      },
    });
  }
}
