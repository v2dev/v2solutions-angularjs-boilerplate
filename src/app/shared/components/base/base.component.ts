import { Component, DestroyRef, inject } from '@angular/core';
import { ApiUrl } from 'src/app/core/constants/apiUrl.constant';
import { AppConstants } from 'src/app/core/constants/appConstant';
import { AppIcons, AppRoutes } from 'src/app/core/constants/appSettings';
@Component({
  selector: 'app-base',
  template: '',
})
export class BaseComponent {
  destroyRef = inject(DestroyRef);
  path = AppRoutes;
  constants = AppConstants;
  appIcon = AppIcons;
  apiUrl = ApiUrl;
}
