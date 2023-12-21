import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { By } from '@angular/platform-browser';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxPaginationModule],
      declarations: [PaginationComponent]
    });
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onPageChange method', () => {
    spyOn(component, 'onPageChange');
    el = fixture.debugElement.query(By.css('pagination-controls')).nativeElement;
    el.dispatchEvent(new Event('pageChange'));
    expect(component.onPageChange).toHaveBeenCalledTimes(1);
  })

});
