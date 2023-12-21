import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EmployeeService } from './employee.service';
import { environment } from '@environments/environment.development';
import { EMPLOYEES } from '@app/mock/employees';
import { USER } from '@app/mock/user';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let testController: HttpTestingController;
  const baseURL = environment.apiUrl;
  const user = {
    name: "",
    email: "",
    designation: "",
    dob: new Date(),
    education: "",
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService],
    });
    service = TestBed.inject(EmployeeService);
    testController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all the employees', () => {
    const obj = { limit: 10, page: 1, filterStr: '', sortOrder: 'asc', sortColumn: 'name' }
    service.getEmployees(obj).subscribe(result => {
      expect(result).toBeTruthy();
    })
    const mockReq = testController.expectOne(`${baseURL}/employees?limit=${obj.limit}&page=${obj.page}&filter=${obj.filterStr}&sort=${obj.sortOrder}&sortedColumn=${obj.sortColumn}`)
    expect(mockReq.request.method).toBe('GET');
    mockReq.flush(Object.values(EMPLOYEES));
  });

  it('should add an employee', () => {
    service.addEmployee(user).subscribe(result => {
      expect(result).toBeTruthy();
      expect(result.name).toBe('Puneet');
    })
    const mockReq = testController.expectOne(`${baseURL}/employees`)
    expect(mockReq.request.method).toBe('POST');
    expect(mockReq.request.body.email).toEqual(user.email);
    mockReq.flush(USER[0]);
  });

  it('should update an employee', () => {
    service.editEmployee('1', user).subscribe(result => {
      expect(result).toBeTruthy();
      expect(result.name).toBe('Puneet');
    })
    const mockReq = testController.expectOne(`${baseURL}/employees/1`)
    expect(mockReq.request.method).toBe('PUT');
    mockReq.flush(USER[0]);
  });

  it('should delete an employee', () => {
    service.deleteEmployee('1').subscribe(result => {
      expect(result).toBeTruthy();
      expect(result.name).toBe('Puneet');
    })
    const mockReq = testController.expectOne(`${baseURL}/employees/1`)
    expect(mockReq.request.method).toEqual('DELETE');
    mockReq.flush(USER[0]);
  });

  afterEach(() => {
    testController.verify();
  })
});
