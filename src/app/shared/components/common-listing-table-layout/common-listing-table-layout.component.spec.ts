import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonListingTableLayoutComponent } from './common-listing-table-layout.component';
import { AppModule } from 'src/app/app.module';

describe('CommonListingTableLayoutComponent', () => {
  let component: CommonListingTableLayoutComponent;
  let fixture: ComponentFixture<CommonListingTableLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [CommonListingTableLayoutComponent],
    });
    fixture = TestBed.createComponent(CommonListingTableLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
