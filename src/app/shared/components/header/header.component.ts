import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  profileMenu: MenuItem[] = [];
  theme = 'dark';
  destroy$: Subject<void> = new Subject();

  constructor(
    private readonly authService: AuthService,
    private readonly themeService: ThemeService,
  ) {}

  ngOnInit() {
    this.profileMenu = [
      {
        label: 'Change Theme',
        icon: 'pi pi-fw pi-plus',
        command: () => {
          this.change();
        },
      },
      {
        icon: 'pi pi-fw pi-trash',
        label: 'Logout',
        command: () => {
          this.logout();
        },
      },
    ];
  }

  logout() {
    this.authService.logOut();
  }

  change() {
    let theme = '';
    if (this.theme === 'dark') {
      theme = 'bootstrap4-light-blue';
      this.theme = 'light';
    } else {
      theme = 'bootstrap4-dark-blue';
      this.theme = 'dark';
    }
    this.themeService.switchTheme(theme);
  }
}
