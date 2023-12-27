import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavDataType, navbarData } from './nav-data';
import { Router, Event, NavigationStart } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Observable } from 'rxjs';

interface SidebarToggle {
  screenWidth: number;
  collapsed: boolean
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  collapsed: boolean = false;
  navData = navbarData;
  screenWidth = 0;
  isLoggedIn$!: Observable<boolean>;
  activePath: string = 'home';
  @Output() onToggleSidebar: EventEmitter<SidebarToggle> = new EventEmitter();

  constructor(
    private router: Router,
    private authService: AuthService,
    private socialAuthService: SocialAuthService
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.activePath = event.url.split('/')[1];
      }
    })
  }

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token)
      this.authService.loggedIn.next(true);
    this.isLoggedIn$ = this.authService.isLoggedIn;

  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSidebar.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  onClick(route: NavDataType) {
    if (route.routerLink == 'login') {
      this.authService.logout();
      this.socialAuthService.signOut();
    } else {
      this.router.navigate([route.routerLink]);
    }
  }

}
