import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeComponent } from './add-employee.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddEmployeeComponent', () => {
  let component: AddEmployeeComponent;
  let fixture: ComponentFixture<AddEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AddEmployeeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('Should check intial form values', () => {
    const addEmployeeFormGroup = component.addEmployeeForm;
    const addEmployeeFormValues = {
      name: '',
      email: '',
      dob: '',
      designation: '',
      education: '',
    }
    expect(addEmployeeFormGroup.value).toEqual(addEmployeeFormValues);
  });

  it('should invalid form when empty', () => {
    component.addEmployeeForm.controls['name'].setValue('');
    component.addEmployeeForm.controls['email'].setValue('');
    component.addEmployeeForm.controls['dob'].setValue('');
    component.addEmployeeForm.controls['designation'].setValue('');
    component.addEmployeeForm.controls['education'].setValue('');
    expect(component.addEmployeeForm.valid).toBeFalsy();
  });

  it('full name field validity', () => {
    const name = component.addEmployeeForm.controls['name'];
    expect(name.valid).toBeFalsy();
    name.setValue('');
    expect(name.hasError('required')).toBeTruthy();
  });

  it('email field validity', () => {
    const email = component.addEmployeeForm.controls['email'];
    expect(email.valid).toBeFalsy();
    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();
  });

  it('dob field validity', () => {
    const dob = component.addEmployeeForm.controls['dob'];
    expect(dob.valid).toBeFalsy();
    dob.setValue('');
    expect(dob.hasError('required')).toBeTruthy();
  });

  it('designation field validity', () => {
    const designation = component.addEmployeeForm.controls['designation'];
    expect(designation.valid).toBeFalsy();
    designation.setValue('');
    expect(designation.hasError('required')).toBeTruthy();
  });

  it('education field validity', () => {
    const education = component.addEmployeeForm.controls['education'];
    expect(education.valid).toBeFalsy();
    education.setValue('');
    expect(education.hasError('required')).toBeTruthy();
  });

  it('form should be valid', () => {
    component.addEmployeeForm.controls['name'].setValue('Jack');
    component.addEmployeeForm.controls['email'].setValue('jack@gmail.com');
    component.addEmployeeForm.controls['dob'].setValue('01/01/1990');
    component.addEmployeeForm.controls['designation'].setValue('SSE');
    component.addEmployeeForm.controls['education'].setValue('MCA');
    expect(component.addEmployeeForm.valid).toBeTruthy();
  });

})
