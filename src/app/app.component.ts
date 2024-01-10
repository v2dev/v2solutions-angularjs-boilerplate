import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { AppConstants } from './core/constants/appConstant';
import { AppRouts, AppSettings } from './core/constants/appSettings';
import { Menu } from './shared/models/common.model';
import { AuthService } from './shared/services/auth.service';
import { CheckUpdateService } from './shared/services/check-update.service';
import { CommonService } from './shared/services/common.service';
import { MenuService } from './shared/services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'base-project';
  isAuthorized = false;
  isFooterEnable = AppSettings.isFooterEnable;
  menuPosition = AppSettings.menuPosition;
  headerElement: any;
  isUIBlocked = false;
  constants = AppConstants;
  @ViewChild('headerElement', { static: false }) set content(content: ElementRef) {
    if (content) {
      this.onResize();
      this.headerElement = content;
    }
  }
  footerElement: any;
  @ViewChild('footerElement', { static: false }) set footerContent(content: ElementRef) {
    if (content) {
      this.onResize();
      this.footerElement = content;
    }
  }
  height = 0;
  menu: Menu[] = [];

  constructor(
    private readonly primengConfig: PrimeNGConfig,
    private readonly authService: AuthService,
    private readonly checkUpdateService: CheckUpdateService,
    private readonly commonService: CommonService,
    private readonly menuService: MenuService,
    private readonly cdf: ChangeDetectorRef,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.authService.isAuthorized.subscribe((res: boolean) => {
      if (!res && !window.location.href.includes('redirect')) {
        this.router.navigateByUrl(`/${AppRouts.login}`);
      }
      this.isAuthorized = res;
    });
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.checkUpdateService.checkForUpdate();
    this.menu = this.menuService.getActiveMenu();
    this.initializeBlockUIListener();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const headerSize = this.headerElement ? this.headerElement.nativeElement.offsetHeight : 0;
    const footerSize = this.footerElement ? this.footerElement.nativeElement.offsetHeight : 0;
    const fullScreenHeight = window.innerHeight;
    const height = fullScreenHeight - (headerSize + footerSize);
    const mainContainer = document.getElementById('main-container');
    if (mainContainer) {
      mainContainer.style.marginTop = `${headerSize}px`;
      mainContainer.style.minHeight = `${height}px`;
      mainContainer.style.maxHeight = `${height}px`;
    }
    const sideMenu = document.getElementById('side-menu');
    if (sideMenu) {
      sideMenu.style.minHeight = `${height}px`;
      sideMenu.style.maxHeight = `${height}px`;
    }
    this.height = height;
  }

  onReload() {
    window.location.reload();
  }

  private initializeBlockUIListener() {
    this.commonService.blockUI$.subscribe((blockUI) => {
      this.isUIBlocked = blockUI;
      this.cdf.detectChanges();
    });
  }
}
