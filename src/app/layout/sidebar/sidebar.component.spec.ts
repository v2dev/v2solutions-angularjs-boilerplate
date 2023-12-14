import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let el : HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call toggleCollapse method', () => {
    spyOn(component, 'toggleCollapse');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.toggleCollapse).toHaveBeenCalledTimes(1);
  });

  it('should call onClick method', () => {
    spyOn(component, 'onClick');
    el = fixture.debugElement.query(By.css('a')).nativeElement;
    el.click();
    expect(component.onClick).toHaveBeenCalledTimes(1);
  });
});
