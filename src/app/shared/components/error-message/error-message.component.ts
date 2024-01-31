import { Component, Input } from '@angular/core';
import { AbstractControl, AbstractControlDirective } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  template: `
  @for (errorMessage of listErrors(); let last = $last; track $index) {
    <small class="text-danger">
      {{ last ? errorMessage : '' }}
    </small>
  }
  `,
  styles: [
    `
      .text-danger {
        font-size: 12px;
      }
    `,
  ],
})
export class ErrorMessageComponent {
  errorMsgList: string[] = [];

  @Input()
  control!: AbstractControl | AbstractControlDirective | undefined;

  errorMessage: any = {
    required: () => `This field is required`,
    email: () => `Invalid email`,
    maxlength: (params: { requiredLength: number }) => `Maximum ${params?.requiredLength} characters are allowed`,
    minlength: (params: { requiredLength: number }) => `Minimum ${params?.requiredLength} characters are required`,
    pattern: () => `Invalid format`,
    whitespace: () => `White spaces are not allowed`,
    misMatch: () => `Passwords don't match`,
  };

  listErrors(): string[] {
    if (!this.control) {
      return [];
    }
    if (this.control?.errors) {
      this.errorMsgList = [];
      Object.keys(this.control?.errors).forEach((error) => {
        const errorKey = this.control?.errors ? this.control?.errors[error] : '';
        const errorMsg = errorKey && this.errorMessage[error] ? this.errorMessage[error](errorKey) : '';
        if (this.control?.touched || this.control?.dirty) {
          this.errorMsgList.push(errorMsg);
        }
      });
      return this.errorMsgList;
    } else {
      return [];
    }
  }
}
