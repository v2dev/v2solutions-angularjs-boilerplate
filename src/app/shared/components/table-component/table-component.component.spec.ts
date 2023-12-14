import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponentComponent } from './table-component.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { By } from '@angular/platform-browser';

describe('TableComponentComponent', () => {
  let component: TableComponentComponent;
  let fixture: ComponentFixture<TableComponentComponent>;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxPaginationModule],
      declarations: [TableComponentComponent]
    });
    fixture = TestBed.createComponent(TableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
/*
  it('should call onSortClick method', () => {
    spyOn(component, 'onSortClick');
    el = fixture.debugElement.query(By.css('i')).nativeElement;
    el.click();
    expect(component.onSortClick).toHaveBeenCalledTimes(1);
  });
 
  it('should call editRecord method', () => {
    spyOn(component, 'editRecord');
    el = fixture.debugElement.query(By.css('i')).nativeElement;
    el.click();
    expect(component.editRecord).toHaveBeenCalledTimes(1);
  });

  it('should call deleteRecord method', () => {
    spyOn(component, 'deleteRecord');
    el = fixture.debugElement.query(By.css('i')).nativeElement;
    el.click();
    expect(component.deleteRecord).toHaveBeenCalledTimes(1);
  }); */
});
