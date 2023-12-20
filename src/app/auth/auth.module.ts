import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthenticatorComponent } from './authenticator/authenticator.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SocialLoginModule, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { SocialAuthConfig } from '@app/shared/social-auth-config/socialAuthServiceConfig';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    AuthenticatorComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SocialLoginModule,
    GoogleSigninButtonModule
  ],
  providers: [SocialAuthConfig]
})
export class AuthModule { }
