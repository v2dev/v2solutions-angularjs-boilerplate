import { Component, Input } from '@angular/core';
import { Menu } from '../../models/common.model';

@Component({
  selector: 'app-slide-menu',
  templateUrl: './slide-menu.component.html',
  styleUrls: ['./slide-menu.component.scss'],
})
export class SlideMenuComponent {
  @Input() menuList: Menu[] = [];
}
