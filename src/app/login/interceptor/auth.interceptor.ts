import {Injectable} from "@angular/core";
import {catchError, Observable, throwError} from "rxjs";
import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {LoginService} from '../service/login.service';

@Injectable({providedIn: 'root'})
export class AuthInterceptor  {

  constructor(private loginService: LoginService) {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const xhr = req.clone(
      {headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')}
    );
    return next(xhr)
      .pipe(
        catchError((err) => {
          this.handleAuthError(err);
          return throwError(() => err);
        })
      );
  }

  private handleAuthError(err: HttpErrorResponse): void {
    if (err.status === 401) {
      this.loginService.resetUserData();
    }
  }
}
