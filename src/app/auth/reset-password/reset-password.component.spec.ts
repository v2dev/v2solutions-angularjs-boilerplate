import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordComponent } from './reset-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ResetPasswordComponent]
    });
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should check intial form values', () => {
    const resetPassFormGroup = component.resetPassForm;
    const resetPassFormValues = {
      otp: '',
      password: '',
      confirmPassword: '',
    }
    expect(resetPassFormGroup.value).toEqual(resetPassFormValues);
  });

  it('should invalid form when empty', () => {
    component.resetPassForm.controls['otp'].setValue('');
    component.resetPassForm.controls['password'].setValue('');
    component.resetPassForm.controls['confirmPassword'].setValue('');
    expect(component.resetPassForm.valid).toBeFalsy();
  });

  it('otp field validity', () => {
    const otp = component.resetPassForm.controls['otp'];
    expect(otp.valid).toBeFalsy();
    otp.setValue('');
    expect(otp.hasError('required')).toBeTruthy();
  });

  it('password field validity', () => {
    const password = component.resetPassForm.controls['password'];
    expect(password.valid).toBeFalsy();
    password.setValue('');
    expect(password.hasError('required')).toBeTruthy();
  });

  it('confirmPassword field validity', () => {
    const confirmPassword = component.resetPassForm.controls['confirmPassword'];
    expect(confirmPassword.valid).toBeFalsy();
    confirmPassword.setValue('');
    expect(confirmPassword.hasError('required')).toBeTruthy();
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
    component.resetPassForm.controls['otp'].setValue('123');
    component.resetPassForm.controls['password'].setValue('qwerty@12');
    component.resetPassForm.controls['confirmPassword'].setValue('qwerty@12');
    expect(component.resetPassForm.valid).toBeTruthy();
  });
});
