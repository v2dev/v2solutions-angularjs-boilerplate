import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { GoogleSigninButtonModule, SocialLoginModule } from '@abacritt/angularx-social-login';
import { SocialAuthConfig } from '@app/shared/social-auth-config/socialAuthServiceConfig';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, SocialLoginModule, GoogleSigninButtonModule],
      declarations: [ForgotPasswordComponent],
      providers: [SocialAuthConfig]
    });
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should check intial form values', () => {
    const forgotPasswordFormGroup = component.forgotPasswordForm;
    const forgotPasswordFormValues = {
      email: '',
    }
    expect(forgotPasswordFormGroup.value).toEqual(forgotPasswordFormValues);
  });

  it('should invalid form when empty', () => {
    component.forgotPasswordForm.controls['email'].setValue('');
    expect(component.forgotPasswordForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    const email = component.forgotPasswordForm.controls['email'];
    expect(email.valid).toBeFalsy();
    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();
  });

  it('should set submitted to true', () => {
    component.onSubmit();
    expect(component['submitted']).toBeTruthy();
  });

  it('should call onSubmit method', () => {
    spyOn(component, 'onSubmit');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('form should be valid', () => {
    component.forgotPasswordForm.controls['email'].setValue('abc@gmail.com');
    expect(component.forgotPasswordForm.valid).toBeTruthy();
  });
});
