import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogModalComponent } from 'src/app/shared/components/dialog-modal/dialog-modal.component';
import { TableComponentComponent } from 'src/app/shared/components/table-component/table-component.component';
import { ColumnType, Employee, GetEmployee } from 'src/app/shared/models/employee.model';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorModule } from 'primeng/paginator';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    TableComponentComponent,
    DialogModalComponent,
    ToolbarModule, ButtonModule,
    AddEmployeeComponent,
    PaginatorModule,
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

  @ViewChild(AddEmployeeComponent) addEmployeeComponent?: AddEmployeeComponent;
  submitted: boolean = false;
  ref: DynamicDialogRef | undefined;

  constructor(private employeeService: EmployeeService,
    private dialogService: DialogService,
    private messageService: MessageService) { }

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


  addNew() {
    this.ref = this.dialogService.open(AddEmployeeComponent, {
      header: 'Add New Employee',
      width: '40%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      footer: ''
    });

    this.ref.onClose.subscribe((product: any) => {
      if (product) {
        debugger
      }
    });
  }

  editRecord(rowData: Employee) {
    debugger
  }

  deleteRecord(rowData: Employee) {
    this.employeeService.deleteEmployee(rowData._id).subscribe((response) => {
      if (response && response.message) {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
      }
    })
  }
}
