import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { PaginatorModule } from 'primeng/paginator';
import { ColumnType } from '../../models/employee.model';
import { StyleClassModule } from 'primeng/styleclass';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
  selector: 'table-component',
  standalone: true,
  templateUrl: './table-component.component.html',
  styleUrl: './table-component.component.scss',
  imports: [
    TableModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    InputTextareaModule,
    PaginatorModule,
    StyleClassModule,
    ConfirmDialogModule,
    ConfirmPopupModule
  ],
  providers: [ConfirmationService]
})
export class TableComponentComponent implements AfterViewInit {
  @Input() tableColumns: ColumnType[] = [];
  @Input() tableData: any[] = [];
  @Input() tableMinLength: string = '600px';
  @Input() enableEdit: boolean = false;
  @Input() enableDelete: boolean = false;
  @Output() filter: EventEmitter<any> = new EventEmitter();
  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @ViewChild('search') searchTextRef!: ElementRef;

  constructor(private confirmationService: ConfirmationService) { }

  // Table Search
  ngAfterViewInit() {
    if (this.searchTextRef) {
      fromEvent(this.searchTextRef.nativeElement, 'keyup').pipe(
        debounceTime(300),
        distinctUntilChanged()).subscribe((res: any) => {
          const searchText = this.searchTextRef.nativeElement.value;
          this.filter.emit(searchText);
        })
    }
  }

  editRecord(rowData: object) {
    this.onEdit.emit(rowData);
  }

  deleteRecord(rowData: object) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected record?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onDelete.emit(rowData);
      }
    });
  }
}
