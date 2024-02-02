import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SocialAuthConfig } from 'src/app/shared/social-auth-config/socialAuthServiceConfig';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { GoogleSigninButtonModule, SocialLoginModule } from '@abacritt/angularx-social-login';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule, SocialLoginModule, GoogleSigninButtonModule],
      declarations: [LoginComponent],
      providers:[SocialAuthConfig]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should check initial form values', () => {
    const loginFormGroup = component.loginForm;
    const loginFormValues = {
      email: '',
      password: '',
    }
    expect(loginFormGroup.value).toEqual(loginFormValues);
  });

  it('should invalid form when empty', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should check email field validity', () => {
    const email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();
    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();
  });

  it('should check password field validity', () => {
    const password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();
    password.setValue('');
    expect(password.hasError('required')).toBeTruthy();
  });

  it('should set loading to true', () => {
    component.login();
    expect(component['loading']).toBeTruthy();
  });
/* 
  it('should call login method', () => {
    spyOn(component, 'login');
    const buttonEl = fixture.debugElement.query(By.css('.p-button'));
    buttonEl.nativeElement.click();
    expect(component.login).toHaveBeenCalledTimes(1);
  }); */

  it('form should be valid', () => {
    component.loginForm.controls['email'].setValue('abc@gmail.com');
    component.loginForm.controls['password'].setValue('abc@12');
    expect(component.loginForm.valid).toBeTruthy();
  });
});
