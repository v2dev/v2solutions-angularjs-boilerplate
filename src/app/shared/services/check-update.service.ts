import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class CheckUpdateService {
  constructor(
    public readonly updates: SwUpdate,
    private readonly messageService: MessageService,
  ) {}

  public checkForUpdate(): void {
    this.updates.versionUpdates.subscribe((event) => {
      this.promptUser(event);
    });
    if (this.updates.isEnabled) {
      this.updates.activateUpdate();
      setInterval(() => {
        this.updates.checkForUpdate();
      }, 2000 * 60);
    }
  }

  private promptUser(e: any): void {
    if (e.available) {
      this.messageService.add({ key: 'confirm', severity: 'success', summary: 'Sticky', detail: 'Message Content', sticky: true });
    }
  }
}
