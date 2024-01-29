import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { AuthenticatorComponent } from "./authenticator/authenticator.component";
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { SocialAuthConfig } from 'src/app/shared/social-auth-config/socialAuthServiceConfig';


@NgModule({
    declarations: [LoginComponent],
    exports: [SharedModule],
    imports: [
        CommonModule,
        AuthRoutingModule,
        SharedModule,
        AuthenticatorComponent,
        GoogleSigninButtonModule
    ],
    providers: [SocialAuthConfig]
})
export class AuthModule { }
