import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BlockUIModule } from 'primeng/blockui';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SlideMenuComponent } from './shared/components/slide-menu/slide-menu.component';
import { SharedModule } from './shared/modules/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { GoogleSigninButtonModule, SocialLoginModule } from '@abacritt/angularx-social-login';
import { jwtInterceptorProviders, serverErrorHandlerInterceptorProviders } from './core/interceptor';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, SlideMenuComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    SharedModule,
    MenuModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.enableAutoUpdateCheck,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    PanelMenuModule,
    BlockUIModule,
    SocialLoginModule,
    GoogleSigninButtonModule
  ],
  providers: [jwtInterceptorProviders, serverErrorHandlerInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
