import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../users/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersUrl = 'api/users';

  constructor(private http: HttpClient) {}

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(this.usersUrl + "/id/" + id);
  }

}
