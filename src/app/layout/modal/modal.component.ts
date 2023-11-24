import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() title: string = 'Modal';
  @Input() buttonDisabled: boolean = false;
  @Input() buttonName: string = 'Modal';
  @Input() width: string = '22rem';
  @Output() onModalSubmit = new EventEmitter();

  onSubmit() {
    this.onModalSubmit.emit();
  }
}
