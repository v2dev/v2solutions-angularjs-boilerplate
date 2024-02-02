import { TestBed, async } from '@angular/core/testing';

import { CheckUpdateService } from './check-update.service';
import { SwUpdate } from '@angular/service-worker';
import { AppModule } from 'src/app/app.module';

describe('CheckUpdateService', () => {
  let service: CheckUpdateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [SwUpdate]
    });
    service = TestBed.inject(CheckUpdateService);
  }))

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
