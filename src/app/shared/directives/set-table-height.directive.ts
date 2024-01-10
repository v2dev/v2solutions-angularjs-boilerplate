import { Directive, ElementRef, HostListener, Input, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[setTableHeight]',
})
export class SetTableHeightDirective {
  @Input() isFilterDisplay: boolean = false;
  @Input() isFullScreen: boolean = false;
  @Input() hasPagination = true;

  constructor(private readonly el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['isFilterDisplay'] && changes['isFilterDisplay'].currentValue !== changes['isFilterDisplay'].previousValue) {
      setTimeout(() => {
        this.setFixedContainer();
      }, 100);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(e: any) {
    this.setFixedContainer();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.el) {
        this.setFixedContainer();
      }
    }, 500);
  }

  setFixedContainer() {
    if (this.el.nativeElement) {
      const footer = document.getElementById('footer');
      const rect = this.el.nativeElement.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop,
        el = { top: rect.top + scrollTop, left: rect.left + scrollLeft };
      const footerHeight = this.isFullScreen ? 0 : footer && footer.offsetHeight ? footer.offsetHeight : 0;
      const height = window.innerHeight - (this.isFullScreen ? 30 : el.top) - footerHeight - (this.hasPagination ? 80 : 40);
      this.el.nativeElement.style.maxHeight = `${height}px`;
    }
  }
}
