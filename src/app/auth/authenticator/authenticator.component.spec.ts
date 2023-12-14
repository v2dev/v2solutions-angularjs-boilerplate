import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatorComponent } from './authenticator.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

describe('AuthenticatorComponent', () => {
  let component: AuthenticatorComponent;
  let fixture: ComponentFixture<AuthenticatorComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [AuthenticatorComponent]
    });
    fixture = TestBed.createComponent(AuthenticatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should check intial form values', () => {
    const authenticatorFormGroup = component.authenticatorForm;
    const authenticatorFormValues = {
      otp: '',
    }
    expect(authenticatorFormGroup.value).toEqual(authenticatorFormValues);
  });

  it('should be invalid form when empty', () => {
    component.authenticatorForm.controls['otp'].setValue('');
    expect(component.authenticatorForm.valid).toBeFalsy();
  });

  it('otp field validity', () => {
    const otp = component.authenticatorForm.controls['otp'];
    expect(otp.valid).toBeFalsy();
    otp.setValue('');
    expect(otp.hasError('required')).toBeTruthy();
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
    component.authenticatorForm.controls['otp'].setValue('123456');
    expect(component.authenticatorForm.valid).toBeTruthy();
  });
});
