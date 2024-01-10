import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonListingTableLayoutComponent } from './common-listing-table-layout.component';

describe('CommonListingTableLayoutComponent', () => {
  let component: CommonListingTableLayoutComponent;
  let fixture: ComponentFixture<CommonListingTableLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
