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
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  })

  it('should call success method', () => {
    let spy = spyOn(service, 'success');
    service.success('Successfully called', 'success');
    expect(spy).toHaveBeenCalled();
  })

  it('should call error method', () => {
    let spy = spyOn(service, 'error');
    service.error('Error found', 'error');
    expect(spy).toHaveBeenCalled();
  })

  it('should call info method', () => {
    let spy = spyOn(service, 'info');
    service.info('Important information', 'info');
    expect(spy).toHaveBeenCalled();
  })

  it('should call warning method', () => {
    let spy = spyOn(service, 'warning');
    service.warning('Warning alert', 'warning');
    expect(spy).toHaveBeenCalled();
  })
})
