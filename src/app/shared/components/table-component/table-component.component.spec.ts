import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { TableComponentComponent } from './table-component.component';
import { By } from '@angular/platform-browser';
import { ConfirmDialog } from 'primeng/confirmdialog';

describe('TableComponentComponent', () => {
  let component: TableComponentComponent;
  let fixture: ComponentFixture<TableComponentComponent>;
  const demoData = {
    designation: "SSE",
    dob: "2024-01-18T00:00:00.000Z",
    education: "MCA",
    email: "abhijit@gmail.com",
    name: "Abhijit",
    _id: "65b20f3b376a447da6272b9d"
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponentComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the editRecord method', async(() => {
    fixture.whenStable().then(() => {
      component.onEdit.subscribe(res => {
        expect(res).toEqual(demoData);
      })
      component.editRecord(demoData);
    })
  }))

  /* it('should call the deleteRecord method', () => {debugger
    let confirmdialog: ConfirmDialog = fixture.debugElement.query(By.css('.p-confirm-dialog')).componentInstance;

    let accept = spyOn(confirmdialog, 'accept').and.callThrough();
    component.deleteRecord(demoData);

    let acceptBtn = fixture.debugElement.nativeElement.querySelector('.p-confirm-dialog-accept');
    acceptBtn.click();

    expect(accept).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      component.onDelete.subscribe(res => {
        expect(res).toEqual(demoData)
      })
      component.deleteRecord(demoData);
    })
  }) */
});
