import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private readonly blockUI$Subject: Subject<boolean> = new Subject();

  get blockUI$(): Observable<boolean> {
    return this.blockUI$Subject.asObservable();
  }

  setBlockUI$(value: boolean): void {
    this.blockUI$Subject.next(value);
  }
}
