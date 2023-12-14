import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth/auth.service';
import { emailValidator } from '@app/shared/validators/email-validator';
import { matchValue } from '@app/shared/validators/match-value-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  cityList: any[] = [
    { id: 'in', name: 'India' },
    { id: 'us', name: 'United States' }
  ];
  submitted: boolean = false;
  authenticator: boolean = false;
  imgUrl: string = '';
  user: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, emailValidator()]],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    },
      { validator: matchValue('password', 'confirmPassword') });
  }

  onSubmit() {
    this.submitted = true;
    this.authService.register(this.registerForm.value).subscribe(res => {
      if (res) {
        this.authenticator = true;
        this.imgUrl = res.qrCodeUrl;
        this.user = this.registerForm.value.email;
      }
    }, (error) => {
      this.submitted = false;
      console.error('Something went wrong:', error);
    })
  }

  get form() {
    return this.registerForm?.controls;
  }

}
