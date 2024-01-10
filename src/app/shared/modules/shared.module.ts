import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { BaseComponent } from '../components/base/base.component';
import { CommonListingTableLayoutComponent } from '../components/common-listing-table-layout/common-listing-table-layout.component';
import { ErrorMessageComponent } from '../components/error-message/error-message.component';
import { ReadMoreComponent } from '../components/read-more/read-more.component';
import { AccessControlDirective } from '../directives/access-control.directive';
import { SetTableHeightDirective } from '../directives/set-table-height.directive';

const primeNgModules = [
  PasswordModule,
  DropdownModule,
  PaginatorModule,
  ConfirmPopupModule,
  SidebarModule,
  TooltipModule,
  TableModule,
  InputTextModule,
  CardModule,
  ButtonModule,
  ToastModule,
  MultiSelectModule,
  CheckboxModule,
  OverlayPanelModule,
  DialogModule,
  DividerModule,
  CheckboxModule,
  ProgressSpinnerModule,
];

const commonComponent = [
  AccessControlDirective,
  ErrorMessageComponent,
  SetTableHeightDirective,
  BaseComponent,
  CommonListingTableLayoutComponent,
  ReadMoreComponent,
];

@NgModule({
  declarations: [...commonComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ...primeNgModules,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  providers: [MessageService, ConfirmationService],
  exports: [...commonComponent, ReactiveFormsModule, FormsModule, ...primeNgModules, NgxEchartsModule],
})
export class SharedModule {}
