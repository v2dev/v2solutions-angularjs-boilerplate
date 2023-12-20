import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeComponent } from './employee.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TableComponentComponent } from '@app/shared/components/table-component/table-component.component';
import { PaginationComponent } from '@app/layout/pagination/pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '@app/layout/breadcrumb/breadcrumb.component';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { ModalComponent } from '@app/layout/modal/modal.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { GoogleSigninButtonModule, SocialLoginModule } from '@abacritt/angularx-social-login';
import { SocialAuthConfig } from '@app/shared/social-auth-config/socialAuthServiceConfig';

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxPaginationModule, ReactiveFormsModule, SocialLoginModule, GoogleSigninButtonModule],
      declarations: [
        EmployeeComponent,
        BreadcrumbComponent,
        TableComponentComponent,
        PaginationComponent,
        ModalComponent,
        AddEmployeeComponent],
      providers: [SocialAuthConfig]
    });
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addEmployeeBtnClick method', () => {
    spyOn(component, 'addEmployeeBtnClick');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.addEmployeeBtnClick).toHaveBeenCalledTimes(1);
  });
});
