import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {LoginService} from './login/service/login.service';
import {NgIf} from '@angular/common';
import {Role} from './login/model/role';
import {LoginComponent} from './login/login.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(public loginService:LoginService) {
  }

  protected readonly Role = Role;

  userId: number = 1;

  title = "PCBM"
}
