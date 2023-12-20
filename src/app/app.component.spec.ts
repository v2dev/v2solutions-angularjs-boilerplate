import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GoogleSigninButtonModule, SocialLoginModule } from '@abacritt/angularx-social-login';
import { SocialAuthConfig } from './shared/social-auth-config/socialAuthServiceConfig';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule, SocialLoginModule, GoogleSigninButtonModule],
    declarations: [AppComponent, SidebarComponent],
    providers: [SocialAuthConfig]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Angular Boilerplate Accelerator'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Angular Boilerplate Accelerator');
  });
});
