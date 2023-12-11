import { Component, EventEmitter, Output } from '@angular/core';
import { NavDataType, navbarData } from './nav-data';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';

interface SidebarToggle {
  screenWidth: number;
  collapsed: boolean
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  collapsed: boolean = false;
  navData = navbarData;
  screenWidth = 0;

  @Output() onToggleSidebar: EventEmitter<SidebarToggle> = new EventEmitter();

  constructor(private router: Router, private authService: AuthService) { }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSidebar.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSidebar(): void {
    this.collapsed = false;
    this.onToggleSidebar.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  onClick(route: NavDataType) {
    if (route.routerLink == 'login') {
      route.visible = false;
      this.authService.logout();
    } else {
      this.router.navigate([route.routerLink]);
    }
  }

}
