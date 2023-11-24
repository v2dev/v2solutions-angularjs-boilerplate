import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PasswordMatchDirective } from './shared/password-match.directive';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { tokenInterceptorProviders } from './interceptors';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './layout/modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeeComponent,
    PasswordMatchDirective,
    SidebarComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [tokenInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
