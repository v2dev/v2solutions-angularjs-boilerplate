import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PagingConfig } from '@app/models/paging-config';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() pageConfig: any;
  @Input() previousLabel: string = 'Prev';
  @Input() nextLabel: string = 'Next';
  @Output() pageChange: EventEmitter<any> = new EventEmitter();
  @Output() recordPerPageChange: EventEmitter<any> = new EventEmitter();
  
  autoHide: boolean = true;
  responsive: boolean = true;

  onPageChange(event: any) {
    this.pageChange.emit(event);
  }
  onRecordPerPageChange(event: any): void {
    this.recordPerPageChange.emit(event);
  }
}
