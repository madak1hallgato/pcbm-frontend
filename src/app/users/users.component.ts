import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from './model/user.model';
import {UsersService} from '../services/users.service';
import {NgIf} from '@angular/common';
import {LoginService} from '../login/service/login.service';

@Component({
  selector: 'app-users',
  imports: [
    NgIf
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    public loginService:LoginService
  ) { }

  ngOnInit(){
    this.fetchUser();
  }

  fetchUser(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.usersService.getUserById(id.toString()).subscribe( user => {
      this.user = user
    });
  }

}
