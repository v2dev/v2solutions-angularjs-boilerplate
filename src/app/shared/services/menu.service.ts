import { Injectable } from '@angular/core';
import { AppRouts } from 'src/app/core/constants/appSettings';
import { Menu } from '../models/common.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menu: Menu[] = [
    // {
    //   label: 'Dashboard',
    //   icon: '',
    //   routerLink: '',
    //   visible: true,
    //   items: [{ label: 'Dashboard', icon: '', routerLink: '', visible: true, items: [] }],
    // },
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: `${AppRouts.dashboard}`,
      visible: true,
      items: [],
    },
  ];

  constructor() {}

  getActiveMenu() {
    //base on active module pass menu from here
    return this.menu;
  }
}
