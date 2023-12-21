import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '@environments/environment.development';
import { GoogleSigninButtonModule, SocialLoginModule } from '@abacritt/angularx-social-login';
import { SocialAuthConfig } from '@app/shared/social-auth-config/socialAuthServiceConfig';
import { LOGINUSER } from '@app/mock/loginUser';
import { REGISTERUSER } from '@app/mock/registerUser';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let baseUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SocialLoginModule, GoogleSigninButtonModule],
      providers: [SocialAuthConfig]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getToken() should return null', () => {
    const token = service.getToken();
    expect(token).toEqual(null)
  })

  it('login() should return data', () => {
    service.login({ email: 'punitbhati01@gmail.com', password: 'Punit@123' }).subscribe(res => {
      expect(res.email).toEqual('abc@gmail.com');
    });
    const mockReq = httpTestingController.expectOne(`${baseUrl}/login`)
    expect(mockReq.request.method).toBe('POST');
    expect(mockReq.request.body.email).toEqual('punitbhati01@gmail.com');
    mockReq.flush(LOGINUSER);
  })

  it('should register a user', () => {
    service.register(REGISTERUSER).subscribe(res => {
      expect(res.id).toEqual('13242341');
    });
    const mockReq = httpTestingController.expectOne(`${baseUrl}/signup`)
    expect(mockReq.request.method).toBe('POST');
    expect(mockReq.request.body.email).toEqual('pankaj@gmail.com');
    mockReq.flush(REGISTERUSER);
  })

});
