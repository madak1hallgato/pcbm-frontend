import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {LoginService} from "./service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMsg:string|undefined;

  loginForm: FormGroup = new FormGroup({
    userName: new FormControl<string>(''),
    password: new FormControl<string>('')
  });


  constructor(private loginService:LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const loginFormValue = this.loginForm.value;
    if (loginFormValue.userName && loginFormValue.password) {
      this.errorMsg = undefined;
      this.loginService
        .login(loginFormValue.userName, loginFormValue.password)
        .subscribe({
          next: () => {
            this.router.navigate(['']);
          },
          error: () => {
            this.errorMsg = 'Invalid User/Pass';
          }
        });
    } else {
      this.errorMsg = 'Invalid User/Pass';
    }
  }

}
