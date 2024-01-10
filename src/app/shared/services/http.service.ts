import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(protected readonly httpClient: HttpClient) {}

  get(endpoint: string, resource: any) {
    return this.httpClient.get(endpoint, resource);
  }

  post<ReturnType, RequestBodyType>(endpoint: string, resource: RequestBodyType): Observable<ReturnType> {
    return this.httpClient.post<ReturnType>(endpoint, resource);
  }

  getList<ReturnType>(endpoint: string): Observable<ReturnType> {
    return this.httpClient.get<ReturnType>(endpoint);
  }

  delete<ReturnType>(endpoint: string): Observable<ReturnType> {
    return this.httpClient.delete<ReturnType>(endpoint);
  }

  update<ReturnType, RequestBodyType>(resource: RequestBodyType, endpoint: string): Observable<ReturnType> {
    return this.httpClient.put<ReturnType>(endpoint, resource);
  }

  getById<ReturnType>(endpoint: string): Observable<ReturnType> {
    return this.httpClient.get<ReturnType>(endpoint);
  }
}
