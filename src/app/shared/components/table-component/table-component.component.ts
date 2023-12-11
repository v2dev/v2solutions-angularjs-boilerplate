import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Employee } from '@app/models/employee';
import { PagingConfig } from '@app/models/paging-config';
import { TableColumns } from '@app/models/table-columns';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';

@Component({
  selector: 'table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.scss']
})
export class TableComponentComponent {
  @Input() tableData: Employee[] = [];
  @Input() tableColumns: TableColumns[] = [];
  @Input() sortColumn: string = 'name';
  @Input() sortOrder: string = 'asc';
  @Output() getEmployees: EventEmitter<any> = new EventEmitter();
  @Output() onSort: EventEmitter<any> = new EventEmitter();
  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onSearch: EventEmitter<any> = new EventEmitter();
  @ViewChild('searchText') searchTextRef!: ElementRef;
  @Input() pagingConfig: PagingConfig = {
    itemsPerPageList: [5, 10, 20, 50],
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };


  ngAfterViewInit() {
    if (this.searchTextRef) {
      fromEvent(this.searchTextRef.nativeElement, 'keyup')
        .pipe(debounceTime(500), distinctUntilChanged()).subscribe((res: any) => {
          const searchText = this.searchTextRef.nativeElement.value;
          this.onSearch.emit(searchText);
        })
    }
  }

  editRecord(empId: string | undefined) {
    this.onEdit.emit(empId);
  }

  deleteRecord(empId: string | undefined) {
    this.onDelete.emit(empId);
  }

  onSortClick(colName: string, sortOrder: string) {
    this.onSort.emit({ colName, sortOrder });
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
