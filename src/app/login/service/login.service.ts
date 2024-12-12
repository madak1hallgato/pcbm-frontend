import { Injectable } from '@angular/core';
import {UserDataModel} from "../model/user-data.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, of, tap} from "rxjs";
import { Buffer } from "buffer";
import {Role} from '../model/role';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public user?: UserDataModel;

  constructor(private http: HttpClient, private router: Router) {
  }

  public get isAuthenticated(): boolean {
    return this.user != undefined;
  }

  public get userObservable(): Observable<UserDataModel> {
    const comp = this;
    return this.user !== undefined
      ? of(this.user)
      : this.fetchUserData().pipe(tap((userData) => (comp.user = userData)));
  }

  private static createBasicAuthHeader(username: string, password: string) {
    return (
      'Basic ' +
      Buffer.from(username + ':' + password, 'utf-8').toString('base64')
    );
  }

  public login(username: string, password: string): Observable<UserDataModel> {
    const headers = new HttpHeaders({
      Authorization: LoginService.createBasicAuthHeader(username, password)
    });
    const comp = this;
    return this.fetchUserData(headers).pipe(
      tap((userData) => (comp.user = userData))
    );
  }

  public logout(): void {
    this.http
      .get<any>('api/auth/logout', {})
      .subscribe(() => this.resetUserData());
  }

  public resetUserData(): void {
    this.user = undefined;
    this.router.navigate(["/login"]);
  }

  private fetchUserData(
    headers: HttpHeaders | null = null
  ): Observable<UserDataModel> {
    return this.http.get<UserDataModel>(
      'api/auth/get-user-data',
      headers ? { headers } : {}
    );
  }

  isUserInRole(role: Role) {
    return this.user && this.user.roles && this.user.roles.indexOf(role) > -1;
  }
}
