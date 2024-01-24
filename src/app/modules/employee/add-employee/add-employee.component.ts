import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModalComponent } from 'src/app/shared/components/dialog-modal/dialog-modal.component';
import { alphabetValidator } from 'src/app/shared/validators/alphabet-validator';
import { emailValidator } from 'src/app/shared/validators/email-validator';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'add-employee',
  standalone: true,
  imports: [DialogModalComponent, ButtonModule, CalendarModule, CardModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm!: FormGroup;
  productDialog: boolean = false;

  constructor(private fb: FormBuilder) { }

  closeDialog() {
    this.productDialog = false;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.addEmployeeForm = this.fb.group({
      name: ['', [Validators.required, alphabetValidator()]],
      email: ['', [Validators.required, emailValidator()]],
      dob: ['', [Validators.required, Validators.maxLength(10)]],
      designation: ['', [Validators.required, alphabetValidator()]],
      education: ['', [Validators.required, alphabetValidator()]],
    });
  }

  get form() {
    return this.addEmployeeForm.controls;
  }

  get maxDate() {
    return new Date().getFullYear() - 18 + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
  }
}
