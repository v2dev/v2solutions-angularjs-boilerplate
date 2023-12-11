import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, computed, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '@app/models/employee';
import { PagingConfig } from '@app/models/paging-config';
import { AuthService } from '@app/services/auth/auth.service';
import { EmployeeService } from '@app/services/employee/employee.service';
import { debounceTime, distinctUntilChanged, every, fromEvent } from 'rxjs';
declare var window: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, AfterViewInit {
  filterStr: string = '';
  employeesData: Employee[] = [];
  addEmployeeForm!: FormGroup;
  employeeId: string | undefined;
  formModal: any;
  title!: string;
  modalSubmitBtnName = 'Add';
  // confirmModal: any;
  employeesColumns = [
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email' },
    { name: 'dob', label: 'Date of birth' },
    { name: 'designation', label: 'Designation' },
    { name: 'education', label: 'Education' },
    { name: 'actions', label: 'Actions' },
  ];
  sortingOrder: string = 'asc';
  sortedColumn = 'name';
  @ViewChild('searchText') searchTextRef!: ElementRef;

  pagingConfig: PagingConfig = {
    itemsPerPageList: [5, 10, 20, 50],
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  }

  constructor(private employeeService: EmployeeService, private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.createForm();
    this.getEmployees();
    this.formModal = new window.bootstrap.Modal(document.getElementById('form'));
    // this.confirmModal = new window.bootstrap.Modal(document.getElementById('confirmModal'));
  }

  ngAfterViewInit() {
    if (this.searchTextRef) {
      fromEvent(this.searchTextRef.nativeElement, 'keyup')
        .pipe(debounceTime(500), distinctUntilChanged()).subscribe((res: any) => {
          const searchText = this.searchTextRef.nativeElement.value;
          this.filterStr = searchText;
          this.getEmployees();
        })
    }
  }

  get form() {
    return this.addEmployeeForm.controls;
  }

  getEmployees() {
    const obj = {
      limit: this.pagingConfig.itemsPerPage,
      page: this.pagingConfig.currentPage,
      filterStr: this.filterStr,
      sortOrder: this.sortingOrder,
      sortColumn: this.sortedColumn
    };
    this.employeeService.getEmployees(obj).subscribe((res: any) => {
      if (res && res.employees) {
        this.employeesData = res.employees;
        this.pagingConfig.totalItems = res.totalEmployees;
      }
    }, (error) => {
      if (error.status === 403) {
        alert(error?.error?.error);
        this.authService.logout();
      }
      console.error(error?.error?.error);
    })
  }

  createForm() {
    this.addEmployeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      dob: ['', [Validators.required, Validators.maxLength(10)]],
      designation: ['', Validators.required],
      education: ['', Validators.required],
    });
  }

  addEmployeeBtnClick() {
    this.title = 'Add Employee';
    this.modalSubmitBtnName = 'Add';
    this.addEmployeeForm.reset();
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
    this.employeeService.addEmployee(this.addEmployeeForm.value).subscribe((res: any) => {
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
    const date = new Date(employee.dob).toISOString().slice(0, 10);
    employee.dob = date;
    this.addEmployeeForm.patchValue(employee);
  }

  editEmployee() {
    this.employeeService.editEmployee(this.employeeId, this.addEmployeeForm.value).subscribe((res: any) => {
      alert(res.message);
      this.getEmployees();
    })
  }

  deleteEmployeeBtnClick(empId: string | undefined) {
    this.employeeService.deleteEmployee(empId).subscribe((res: any) => {
      alert(res.message);
      this.getEmployees();
    })
  }

  onSearch(searchText: string) {
    this.filterStr = searchText;
    this.getEmployees();
  }

  onSorting(args: any) {
    this.sortingOrder = args.sortOrder;
    this.sortedColumn = args.colName;
    this.getEmployees();
  }

  onPageChange(args: number) {
    this.pagingConfig.currentPage = args;
    this.getEmployees();
  }
  onRecordPerPageChange(args: any) {
    this.pagingConfig.itemsPerPage = args.value;
    this.pagingConfig.currentPage = 1;
    this.getEmployees();
  }

}
