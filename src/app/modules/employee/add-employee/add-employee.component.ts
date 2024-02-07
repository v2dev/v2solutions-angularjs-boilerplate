import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogModalComponent } from 'src/app/shared/components/dialog-modal/dialog-modal.component';
import { alphabetValidator } from 'src/app/shared/validators/alphabet-validator';
import { emailValidator } from 'src/app/shared/validators/email-validator';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { MessageService } from 'primeng/api';
import { Employee } from 'src/app/shared/models/employee.model';
import { SharedModule } from 'src/app/shared/modules/shared.module';

@Component({
  selector: 'add-employee',
  standalone: true,
  imports: [DialogModalComponent, SharedModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm!: FormGroup;
  productDialog: boolean = false;
  activeForm: string = 'add';
  updateRecordId?: string;
  @Output() refreshData = new EventEmitter();

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private messageService: MessageService) { }

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
    const day = (new Date().getDate() < 10) ? '0' + (new Date().getDate()) : (new Date().getDate());
    const month = ((new Date().getMonth() + 1) < 10) ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1);
    const date = new Date().getFullYear() - 18 + '-' + month + '-' + day;
    return date;
  }

  addEmployee() {
    this.addEmployeeForm.reset();
    this.activeForm = 'add';
  }

  updateEmployee(employee: Employee) {
    const employeeData = structuredClone(employee);
    const date = (employeeData.dob).toString();
    let newDate = date.split("/").reverse().join("-");
    employeeData.dob = newDate;
    this.updateRecordId = employeeData._id;
    this.addEmployeeForm.patchValue(employeeData);
    this.activeForm = 'update';
  }

  submitForm() {
    if (this.addEmployeeForm.valid) {
      const submitData = this.activeForm == 'add' ? this.employeeService.addEmployee(this.addEmployeeForm.value) : this.employeeService.updateEmployee(this.addEmployeeForm.value, this.updateRecordId);
      submitData.subscribe(res => {
        if (res) {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });
          this.refreshData.emit();
        }
      })
    }
  }
}
