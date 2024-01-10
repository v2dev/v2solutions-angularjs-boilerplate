import { Injectable } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  toastrLife = 5000; // in miliseconds

  constructor(
    private readonly messageService: MessageService,
    private readonly primengConfig: PrimeNGConfig,
  ) {
    this.primengConfig.ripple = true;
  }

  success(message?: string, title?: string): void {
    this.messageService.add({ severity: 'success', summary: title, detail: message, life: this.toastrLife });
  }

  /** show error toast */
  error(message?: string, title?: string): void {
    this.messageService.add({ severity: 'error', summary: title, detail: message, life: this.toastrLife });
  }

  /** show info toast */
  info(message?: string, title?: string): void {
    this.messageService.add({ severity: 'info', summary: title, detail: message, life: this.toastrLife });
  }

  /** show warning toast */
  warning(message?: string, title?: string): void {
    this.messageService.add({ severity: 'warn', summary: title, detail: message, life: this.toastrLife });
  }
}
