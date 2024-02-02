import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SocialAuthConfig } from 'src/app/shared/social-auth-config/socialAuthServiceConfig';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RegisterComponent, RouterTestingModule],
      providers:[SocialAuthConfig]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should check intial form values', () => {
    const registerFormGroup = component.registerForm;
    const registerFormValues = {
      name: '',
      email: '',
      country: '',
      password: '',
      confirmPassword: '',
    }
    expect(registerFormGroup.value).toEqual(registerFormValues);
  });

  it('should invalid form when empty', () => {
    component.registerForm.controls['name'].setValue('');
    component.registerForm.controls['email'].setValue('');
    component.registerForm.controls['country'].setValue('');
    component.registerForm.controls['password'].setValue('');
    component.registerForm.controls['confirmPassword'].setValue('');
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should check full name field validity', () => {
    const name = component.registerForm.controls['name'];
    expect(name.valid).toBeFalsy();
    name.setValue('');
    expect(name.hasError('required')).toBeTruthy();
  });

  it('should check email field validity', () => {
    const email = component.registerForm.controls['email'];
    expect(email.valid).toBeFalsy();
    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();
  });

  it('should check country field validity', () => {
    const country = component.registerForm.controls['country'];
    expect(country.valid).toBeFalsy();
    country.setValue('');
    expect(country.hasError('required')).toBeTruthy();
  });

  it('should check password field validity', () => {
    const password = component.registerForm.controls['password'];
    expect(password.valid).toBeFalsy();
    password.setValue('');
    expect(password.hasError('required')).toBeTruthy();
  });

  it('should check confirmPassword field validity', () => {
    const confirmPassword = component.registerForm.controls['confirmPassword'];
    expect(confirmPassword.valid).toBeFalsy();
    confirmPassword.setValue('');
    expect(confirmPassword.hasError('required')).toBeTruthy();
  });

  it('should set loading to true', () => {
    component.signUp();
    expect(component['loading']).toBeTruthy();
  });

  /* it('should call onSubmit method', () => {
    spyOn(component, 'signUp');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.signUp).toHaveBeenCalledTimes(1);
  }); */

  it('form should be valid', () => {
    component.registerForm.controls['name'].setValue('Jack');
    component.registerForm.controls['email'].setValue('jack@gmail.com');
    component.registerForm.controls['country'].setValue('us');
    component.registerForm.controls['password'].setValue('qwerty@12');
    component.registerForm.controls['confirmPassword'].setValue('qwerty@12');
    expect(component.registerForm.valid).toBeTruthy();
  });

});
