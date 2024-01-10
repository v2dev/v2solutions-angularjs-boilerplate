import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AppKeys, AppRouts } from 'src/app/core/constants/appSettings';
import { EncryptStorageService } from 'src/app/core/services/encrypt-storage.service';
import { RequestModel } from 'src/app/modules/login/login.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthorized = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly storageService: EncryptStorageService,
    private readonly router: Router,
    private readonly httpService: HttpService,
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
    return this.httpService.post(``, loginObj);
  }

  logOut() {
    this.storageService.clearLocalStorageByKey(AppKeys.authToken);
    this.router.navigateByUrl(`/${AppRouts.login}`);
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
