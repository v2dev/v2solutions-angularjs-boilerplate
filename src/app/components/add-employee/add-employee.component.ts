import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '@app/models/employee';
import { EmployeeService } from '@app/services/employee/employee.service';
import { alphabetValidator } from '@app/shared/validators/alphabet-validator';
import { emailValidator } from '@app/shared/validators/email-validator';
declare var $: any;

@Component({
  selector: 'add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm!: FormGroup;
  title!: string;
  modalSubmitBtnName = 'Add';
  employeeId: string | undefined;

  @Input() employeesData: Employee[] = [];
  @Output() getEmployees: EventEmitter<any> = new EventEmitter();
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.addEmployeeForm = this.fb.group({
      name: ['', [Validators.required, alphabetValidator()]],
      email: ['', [Validators.required, emailValidator()]],
      dob: ['', [Validators.required, Validators.maxLength(10)]],
      designation: ['', [Validators.required, alphabetValidator()]],
      education: ['', [Validators.required, alphabetValidator()]],
    });
  }

  onAddEmployee() {
    this.title = 'Add Employee';
    this.modalSubmitBtnName = 'Add';
    this.addEmployeeForm.reset();
    this.openModal();
  }

  get form() {
    return this.addEmployeeForm.controls;
  }

  get maxDate() {
    return new Date().getFullYear() - 18 + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
  }

  openModal() {
    $('#form').modal('show');
  }

  closeModal() {
    $('#form').modal('hide');
  }

  onSubmit() {
    this.submitted = true;
    if (this.modalSubmitBtnName == 'Add') {
      this.addEmployee();
    } else if (this.modalSubmitBtnName == 'Update') {
      this.editEmployee();
    }
    this.closeModal();
  }

  addEmployee() {
    this.employeeService.addEmployee(this.addEmployeeForm.value).subscribe((res: any) => {
      alert(res.message);
      this.submitted = false;
      this.getEmployees.emit();
    })
  }

  editEmployeeBtnClick(empId: string | undefined) {
    this.employeeId = empId;
    this.title = 'Edit Employee';
    this.modalSubmitBtnName = 'Update';
    this.openModal();
    const employee: any = this.employeesData.find(emp => emp._id == empId);
    const date = new Date(employee.dob).toISOString().slice(0, 10);
    employee.dob = date;
    this.addEmployeeForm.patchValue(employee);
  }

  editEmployee() {
    this.employeeService.editEmployee(this.employeeId, this.addEmployeeForm.value).subscribe((res: any) => {
      alert(res.message);
      this.submitted = false;
      this.getEmployees.emit();
    })
  }
}
