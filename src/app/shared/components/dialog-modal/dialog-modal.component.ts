import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'dialog-modal',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  templateUrl: './dialog-modal.component.html',
  styleUrl: './dialog-modal.component.scss'
})
export class DialogModalComponent {
  @Input() headerTitle: string = 'Add';
  @Input() productDialog: boolean = false;
  @Output() submit = new EventEmitter();
  @Output() closeDialog = new EventEmitter();

  onSubmit(event: any) {
    this.submit.emit();
    this.closeModal();
  }

  closeModal() {
    this.closeDialog.emit();
  }

}
