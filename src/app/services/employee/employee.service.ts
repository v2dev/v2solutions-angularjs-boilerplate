import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '@app/models/employee';
import { environment } from '@environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseURL: string = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getEmployees(obj: any): Observable<any> {
    const { limit, page, filterStr, sortOrder, sortColumn } = obj;
    return this.http.get(`${this.baseURL}/employee/get?limit=${limit}&page=${page}&filter=${filterStr}&sort=${sortOrder}&sortedColumn=${sortColumn}`);
  }

  addEmployee(user: Employee): Observable<any> {
    return this.http.post(`${this.baseURL}/employee/add`, user);
  }

  editEmployee(id: string | undefined, data: Employee): Observable<any> {
    return this.http.put(`${this.baseURL}/employee/update/${id}`, data);
  }

  deleteEmployee(id: string | undefined): Observable<any> {
    return this.http.delete(`${this.baseURL}/employee/delete/${id}`);
  }
}
