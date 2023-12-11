import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { tokenInterceptorProviders } from './interceptors';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './layout/modal/modal.component';
import { ConfirmationModalComponent } from './layout/confirmation-modal/confirmation-modal.component';
import { TableComponentComponent } from './shared/components/table-component/table-component.component';
import { PaginationComponent } from './layout/pagination/pagination.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeeComponent,
    SidebarComponent,
    ModalComponent,
    ConfirmationModalComponent,
    TableComponentComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [tokenInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
