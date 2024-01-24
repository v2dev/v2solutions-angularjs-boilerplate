import { Injectable } from '@angular/core';
import { GetEmployee } from '../models/employee.model';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { EmployeeApiUrl } from 'src/app/core/constants/apiUrl.constant';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpService: HttpService) { }

  getEmployees(obj: GetEmployee): Observable<any> {
    const { limit, page, filterStr, sortOrder, sortColumn } = obj;
    return this.httpService.getList(`employees?limit=${limit}&page=${page}&filter=${filterStr}&sort=${sortOrder}&sortedColumn=${sortColumn}`);
  }

  /*   addEmployee(user: Employee): Observable<any> {
      return this.httpService.post(`${this.baseURL}/employees`, user);
    }
  
    editEmployee(id: string | undefined, data: Employee): Observable<any> {
      return this.httpService.put(`${this.baseURL}/employees/${id}`, data);
    } */

  deleteEmployee(id: string | undefined): Observable<any> {
    return this.httpService.delete(`${EmployeeApiUrl.employee}/${id}`);
  }
}
