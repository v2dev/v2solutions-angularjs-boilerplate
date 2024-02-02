import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordComponent } from './reset-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SocialAuthConfig } from 'src/app/shared/social-auth-config/socialAuthServiceConfig';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ResetPasswordComponent, RouterTestingModule],
      providers: [SocialAuthConfig]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
  });

  it('Should check initial form values', () => {
    const forgotPasswordFormGroup = component.forgotPasswordForm;
    const forgotPasswordFormValues = {
      email: '',
    }
    expect(forgotPasswordFormGroup.value).toEqual(forgotPasswordFormValues);
  });

  it('should invalid form when email empty', () => {
    component.forgotPasswordForm.controls['email'].setValue('');
    expect(component.forgotPasswordForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    const email = component.forgotPasswordForm.controls['email'];
    expect(email.valid).toBeFalsy();
    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();
  });

 /*  it('should call onSubmit method', () => {
    spyOn(component, 'forgotPasswordSubmit');
    el = fixture.debugElement.query(By.css('p-button')).nativeElement;
    el.click();
    expect(component.forgotPasswordSubmit).toHaveBeenCalledTimes(1);
  }); */

  it('forgot password form should be valid', () => {
    component.forgotPasswordForm.controls['email'].setValue('abc@gmail.com');
    expect(component.forgotPasswordForm.valid).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should check initial form values', () => {
    const resetPassFormGroup = component.resetPasswordForm;
    const resetPassFormValues = {
      otp: '',
      password: '',
      confirmPassword: '',
    }
    expect(resetPassFormGroup.value).toEqual(resetPassFormValues);
  });

  it('should invalid form when empty', () => {
    component.resetPasswordForm.controls['otp'].setValue('');
    component.resetPasswordForm.controls['password'].setValue('');
    component.resetPasswordForm.controls['confirmPassword'].setValue('');
    expect(component.resetPasswordForm.valid).toBeFalsy();
  });

  it('otp field validity', () => {
    const otp = component.resetPasswordForm.controls['otp'];
    expect(otp.valid).toBeFalsy();
    otp.setValue('');
    expect(otp.hasError('required')).toBeTruthy();
  });

  it('password field validity', () => {
    const password = component.resetPasswordForm.controls['password'];
    expect(password.valid).toBeFalsy();
    password.setValue('');
    expect(password.hasError('required')).toBeTruthy();
  });

  it('confirmPassword field validity', () => {
    const confirmPassword = component.resetPasswordForm.controls['confirmPassword'];
    expect(confirmPassword.valid).toBeFalsy();
    confirmPassword.setValue('');
    expect(confirmPassword.hasError('required')).toBeTruthy();
  });

  /*   it('should call resetPasswordSubmit method', () => {
      spyOn(component, 'resetPasswordSubmit');
      el = fixture.debugElement.query(By.css('p-button')).nativeElement;
      el.click();
      expect(component.resetPasswordSubmit).toHaveBeenCalledTimes(1);
    }); */

  it('form should be valid', () => {
    component.resetPasswordForm.controls['otp'].setValue('123456');
    component.resetPasswordForm.controls['password'].setValue('qwerty@12');
    component.resetPasswordForm.controls['confirmPassword'].setValue('qwerty@12');
    expect(component.resetPasswordForm.valid).toBeTruthy();
  });
});
