import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogModalComponent } from 'src/app/shared/components/dialog-modal/dialog-modal.component';
import { TableComponentComponent } from 'src/app/shared/components/table-component/table-component.component';
import { ColumnType, Employee, GetEmployee } from 'src/app/shared/models/employee.model';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorModule } from 'primeng/paginator';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    TableComponentComponent,
    DialogModalComponent,
    ToolbarModule, ButtonModule,
    AddEmployeeComponent,
    PaginatorModule,
    DynamicDialogModule,
    DialogModule
  ],
  providers: [DialogService],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  employeesData: Employee[] = [];
  employeesColumns: ColumnType[] = [
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email' },
    { name: 'dob', label: 'Date of birth' },
    { name: 'designation', label: 'Designation' },
    { name: 'education', label: 'Education' }
  ];
  pageOptions: number[] = [5, 10, 25, 50];
  totalRecords: number = 0;
  recordPerPage: number = 5;
  page: number = 1;
  searchString: string = '';
  showAddForm: boolean = false;
  displayHeaderTitle: string = 'Add New Employee';

  @ViewChild(AddEmployeeComponent) addEmployeeComponent?: AddEmployeeComponent;
  submitted: boolean = false;
  ref: DynamicDialogRef | undefined;

  constructor(private employeeService: EmployeeService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    const obj: GetEmployee = {
      limit: this.recordPerPage,
      page: this.page,
      filterStr: this.searchString,
      sortOrder: '',
      sortColumn: ''
    }
    this.employeeService.getEmployees(obj).subscribe((res: any) => {
      if (res) {
        this.employeesData = res.data;
        this.totalRecords = res.totalRecords;
      }
    })
  }

  onFilter(searchStr: string) {
    this.searchString = searchStr;
    this.getEmployees();
  }

  onPageChange(event: any) {
    this.page = event.page + 1;
    this.recordPerPage = event.rows;
    this.getEmployees();
  }

  addNewEmployee() {
    this.displayHeaderTitle = 'Add new employee';
    this.showAddForm = true;
    this.addEmployeeComponent?.addEmployee();
  }

  editRecord(rowData: Employee) {
    this.displayHeaderTitle = 'Update Employee';
    this.showAddForm = true;
    this.addEmployeeComponent?.updateEmployee(rowData);
  }

  onSubmit() {
    this.addEmployeeComponent?.submitForm();
  }

  onDialogClose() {
    this.showAddForm = false;
  }

  deleteRecord(rowData: Employee) {
    this.employeeService.deleteEmployee(rowData._id).subscribe((response) => {
      if (response && response.message) {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
        this.getEmployees();
      }
    })
  }
}
