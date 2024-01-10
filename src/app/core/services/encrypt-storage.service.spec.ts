import { TestBed } from '@angular/core/testing';

import { EncryptStorageService } from './encrypt-storage.service';

describe('EncryptStorageService', () => {
  let service: EncryptStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
