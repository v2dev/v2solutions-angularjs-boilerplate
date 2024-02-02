import { TestBed } from '@angular/core/testing';

import { ToasterService } from './toaster.service';
import { MessageService } from 'primeng/api';

describe('ToasterService', () => {
  let service: ToasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    });
    service = TestBed.inject(ToasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
