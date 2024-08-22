// forgot-password.component.ts
import { Component } from '@angular/core';
import { ApiService } from '../api.services';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone:true,
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  
     
     
     
  ]
})
export class ForgotPasswordComponent {
  forgotPasswordForm: any;
  


  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService
  ) { }
//   forgotPassword() {
//     this.apiService.forgotPassword(this.EmailAddress).subscribe(
//       (res) => {
// console.log('pasword Reset method',res)
//         this.toastr.success('Password reset link sent to your email!');
//       },
//       (error: any) => {
//         this.toastr.error('Failed to send reset link. Please try again later.');
//         console.error('Error:', error);
//       }
//     );
//   }

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      EmailAddress: ['', [Validators.required, Validators.email]]
    });
  }

  forgotPassword() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    const email = this.forgotPasswordForm.value.email;
    this.apiService.forgotPassword(email).subscribe(
      () => {
        this.toastr.success('Password reset link sent to your email!');
      },
      (error) => {
        this.toastr.error('Failed to send reset link. Please try again later.');
        console.error('Error:', error);
      }
    );
  }
}
