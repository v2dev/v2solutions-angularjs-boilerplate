import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { SlideMenuComponent } from './slide-menu.component';
import { PanelMenuModule } from 'primeng/panelmenu';

describe('SlideMenuComponent', () => {
  let component: SlideMenuComponent;
  let fixture: ComponentFixture<SlideMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PanelMenuModule],
      declarations: [SlideMenuComponent]
    });
    fixture = TestBed.createComponent(SlideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
