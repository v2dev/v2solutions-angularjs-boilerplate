import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '@environments/environment.development';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let baseUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
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
    const mockResponse = {
      success: true,
      message: 'Successfull'
    };
    service.login({ email: 'abc@gmail.com', password: 'Abc@1234' }).subscribe(res => {
      expect(res).toEqual({})
    });
    let req = httpTestingController.expectOne({ method: "POST", url: `${baseUrl}/login` });
    req.flush({});
  })

});
