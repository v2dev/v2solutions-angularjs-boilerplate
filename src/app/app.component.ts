import { Component, computed } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

interface SidebarToggle {
  screenWidth: number;
  collapsed: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular Boilerplate Accelerator';
  isSidebarCollapsed: boolean = false;
  screenWidth = 0;

  constructor(private authService: AuthService) {
  }

  showSidebar = computed(() => this.authService.isAuthenticated);

  onToggleSidebar(data: SidebarToggle): void {
    this.isSidebarCollapsed = data.collapsed;
    this.screenWidth = data.screenWidth;
  }
}
