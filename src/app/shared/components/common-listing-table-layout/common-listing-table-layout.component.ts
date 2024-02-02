import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { TableColumnsModel, TableRowDataModel } from '../../models/common-table-raw-data.model';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-common-listing-table-layout',
  templateUrl: './common-listing-table-layout.component.html',
  styleUrls: ['./common-listing-table-layout.component.scss'],
})
export class CommonListingTableLayoutComponent extends BaseComponent implements OnInit {
  @Input() headers!: TableColumnsModel[];
  @Input() rowData!: TableRowDataModel[];
  @Input() moduleFrom!: string;
  @Input() totalElements!: number;
  @Input() page: number = 0;
  @Output() performedAction = new EventEmitter<{ action: string; slug: string }>();
  @Output() deleteAction = new EventEmitter<string>();
  @Output() pageChangeAction = new EventEmitter<{ page: number; itemPerPage: number }>();
  itemPerPage = 10;
  tableHeight: string = '200px';
  scrollable = false;

  constructor(private readonly confirmationService: ConfirmationService) {
    super();
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    if (this.rowData && this.rowData.length) {
      this.setTableContainer();
      this.scrollable = true;
    } else {
      setTimeout(() => {
        this.ngAfterViewInit();
      }, 0);
    }
  }

  emitAction(action: string, slug: string) {
    if (action === this.constants.DELETE_ACTION) {
      this.confirmationService.confirm({
        target: event?.target as EventTarget,
        message: 'This action might impact other parts as well which needs to be addressed.',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deleteAction.emit(slug);
        },
        reject: () => {
          return;
        },
      });
    } else {
      this.performedAction.emit({
        action: action,
        slug: slug,
      });
    }
  }

  onPageChange(event: any): void {
    this.page = event.page;
    this.itemPerPage = event.rows;
    this.pageChangeAction.emit({
      page: this.page,
      itemPerPage: this.itemPerPage,
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(e: any) {
    this.setTableContainer();
  }

  setTableContainer() {
    const footer = document.getElementById('footer');
    const footerHeight = footer && footer.offsetHeight ? footer.offsetHeight : 0;
    const tableContainer = document.getElementById('table-container');
    const paginationContainer = document.getElementById('pagination-container');
    const paginatorHeight = paginationContainer && paginationContainer.offsetHeight ? paginationContainer.offsetHeight : 0;
    const offsetTop = tableContainer && tableContainer.offsetTop ? tableContainer.offsetTop : 0;
    const height = window.innerHeight - offsetTop - footerHeight - paginatorHeight - 80;
    this.tableHeight = `${height}px`;
  }
}
