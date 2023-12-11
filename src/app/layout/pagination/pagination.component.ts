import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() itemsPerPageList: number[] = [];
  @Input() itemPerPageCount: number = 10;
  @Output() pageChange: EventEmitter<any> = new EventEmitter();
  @Output() recordPerPageChange: EventEmitter<any> = new EventEmitter();

  onPageChange(event: any) {
    this.pageChange.emit(event);
  }
  onRecordPerPageChange(event: any): void {
    this.recordPerPageChange.emit(event);
  }
}
