import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatorComponent } from './authenticator.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppModule } from 'src/app/app.module';
import { DebugElement } from '@angular/core';
import { SocialAuthConfig } from 'src/app/shared/social-auth-config/socialAuthServiceConfig';
import { By } from '@angular/platform-browser';

describe('AuthenticatorComponent', () => {
  let component: AuthenticatorComponent;
  let fixture: ComponentFixture<AuthenticatorComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AuthenticatorComponent],
      providers:[SocialAuthConfig]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthenticatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should check initial form values', () => {
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

  it('should call onSubmit method', () => {
    spyOn(component, 'submitOtp');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.submitOtp).toHaveBeenCalledTimes(1);
  });

  it('form should be valid', () => {
    component.authenticatorForm.controls['otp'].setValue('123456');
    expect(component.authenticatorForm.valid).toBeTruthy();
  });
});
