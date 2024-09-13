import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from '@angular/router';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.services';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone:true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  
     
     
     
  ],
})
export class LoginComponent {

  loginForm: FormGroup;





  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
     private router: Router,
    private actRoute: ActivatedRoute,
  ) {



    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]



    })
  }

  
  navigateTo(page: string) {
    this.router.navigate([page]);
  }

  login() {
     JSON.stringify(this.loginForm.value);
     console.log('login details',this.loginForm.value)
    this.apiService.login(this.loginForm.value).subscribe(
        (res) => {
            this.toastr.success('Successfully logged in!', 'Success');
            console.log('Success:', res);
            this.router.navigate(['/Booking']);
        },
        (error) => {
            this.toastr.error(error.error.message, 'Error');
        }
    );
    this.loginForm.reset()
}


}
