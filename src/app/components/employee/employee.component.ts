import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Employee } from '@app/models/employee';
import { PagingConfig } from '@app/models/paging-config';
import { AuthService } from '@app/services/auth/auth.service';
import { EmployeeService } from '@app/services/employee/employee.service';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  filterStr: string = '';
  employeesData: Employee[] = [];
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
  @ViewChild(AddEmployeeComponent) addEmployeeComponent?: AddEmployeeComponent;

  pagingConfig: PagingConfig = {
    itemsPerPageList: [5, 10, 20, 50],
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  }

  constructor(private employeeService: EmployeeService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getEmployees();
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
      if (res && res.data) {
        this.employeesData = res.data;
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

  addEmployeeBtnClick() {
    this.addEmployeeComponent?.onAddEmployee();
  }

  editEmployeeBtnClick(empId: string | undefined) {
    this.addEmployeeComponent?.editEmployeeBtnClick(empId);
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
