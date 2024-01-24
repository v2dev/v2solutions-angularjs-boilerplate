import { Component, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-dialog-modal',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './dialog-modal.component.html',
  styleUrl: './dialog-modal.component.scss'
})
export class DialogModalComponent {
  @Input() headerTitle: string = 'Add';
  @Input() productDialog: boolean = false;
}
