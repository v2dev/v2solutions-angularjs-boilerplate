import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '@app/models/employee';
import { PagingConfig } from '@app/models/paging-config';
import { TableColumns } from '@app/models/table-columns';

@Component({
  selector: 'table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.scss']
})
export class TableComponentComponent {
  @Input() tableData: Employee[] = [];
  @Input() tableColumns: TableColumns[] = [];
  @Input() sortColumn: string = '';
  @Input() sortOrder: string = '';
  @Output() getEmployees: EventEmitter<any> = new EventEmitter();
  @Output() editRecordClick: EventEmitter<any> = new EventEmitter();
  @Output() deleteRecordClick: EventEmitter<any> = new EventEmitter();
  @Input() pagingConfig: PagingConfig = {
    itemsPerPageList: [5, 10, 20, 50],
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };

  editRecord(empId: string | undefined) {
    this.editRecordClick.emit(empId);
  }

  deleteRecord(empId: string | undefined) {
    this.deleteRecordClick.emit(empId);
  }

  onSort(colName: string, sortOrder: string) {
    this.sortOrder = sortOrder;
    this.sortColumn = colName;
    this.getEmployees.emit();
  }

  onPageChange(args: number) {
    this.pagingConfig.currentPage = args;
    this.getEmployees.emit();
  }
  onRecordPerPageChange(args: any) {
    this.pagingConfig.itemsPerPage = args.value;
    this.pagingConfig.currentPage = 1;
    this.getEmployees.emit();
  }

}
