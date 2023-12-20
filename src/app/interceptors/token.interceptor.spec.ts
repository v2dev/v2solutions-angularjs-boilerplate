import { TestBed } from '@angular/core/testing';

import { TokenInterceptor } from './token.interceptor';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GoogleSigninButtonModule, SocialLoginModule } from '@abacritt/angularx-social-login';
import { SocialAuthConfig } from '@app/shared/social-auth-config/socialAuthServiceConfig';

describe('TokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, SocialLoginModule, GoogleSigninButtonModule],
    providers: [TokenInterceptor, SocialAuthConfig]
  }));

  it('should be created', () => {
    const interceptor: TokenInterceptor = TestBed.inject(TokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
