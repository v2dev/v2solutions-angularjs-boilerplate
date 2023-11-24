import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '@app/models/employee';
import { EmployeeService } from '@app/services/employee/employee.service';
declare var window: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  limit: number = 10;
  page: number = 1;
  filterStr: string = '';
  sortOrder: string = 'asc';
  sortColumn: string = 'name';
  employeesData: Employee[] = [];
  addEmployeeForm!: FormGroup;
  employeeId: string | undefined;
  formModal: any;
  title!: string;
  modalSubmitBtnName = 'Add';

  constructor(private employeeService: EmployeeService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.getEmployees();
    this.formModal = new window.bootstrap.Modal(document.getElementById('myModal'));
  }

  getEmployees() {
    const obj = {
      limit: this.limit,
      page: this.page,
      filterStr: this.filterStr,
      sortOrder: this.sortOrder,
      sortColumn: this.sortColumn
    };
    this.employeeService.getEmployees(obj).subscribe((res: any) => {
      if (res && res.employees) {
        this.employeesData = res.employees;
      }
    }, (error) => {
      console.error('Something went wrong:', error);
    })
  }

  createForm() {
    this.addEmployeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      dob: ['', Validators.required],
      designation: ['', Validators.required],
      education: ['', Validators.required],
    });
  }

  addEmployeeBtnClick() {
    this.title = 'Add Employee';
    this.modalSubmitBtnName = 'Add';
    this.openModal();
  }

  openModal() {
    this.formModal.show();
  }

  closeModal() {
    this.formModal.hide();
  }

  onSubmit() {
    if (this.modalSubmitBtnName == 'Add') {
      this.addEmployee();
    } else if (this.modalSubmitBtnName == 'Update') {
      this.editEmployee();
    }
    this.closeModal();
  }

  addEmployee() {
    this.employeeService.addEmployee(this.addEmployeeForm.value).subscribe(res => {
      alert(res.message);
      this.getEmployees();
    })
  }

  editEmployeeBtnClick(empId: string | undefined) {
    this.employeeId = empId;
    this.title = 'Edit Employee';
    this.modalSubmitBtnName = 'Update';
    this.openModal();
    const employee: any = this.employeesData.find(emp => emp._id == empId);
    this.addEmployeeForm.patchValue(employee);
  }

  editEmployee() {
    this.employeeService.editEmployee(this.employeeId, this.addEmployeeForm.value).subscribe(res => {
      alert(res.message);
      this.getEmployees();
    })
  }

  deleteEmployeeBtnClick(empId: string | undefined) {
    this.employeeService.deleteEmployee(empId).subscribe(res => {
      alert(res.message);
      this.getEmployees();
    })
  }
}
