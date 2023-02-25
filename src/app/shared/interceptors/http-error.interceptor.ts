// Angular.
import { Injectable } from '@angular/core';
import { HttpEvent, HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

// RxJS.
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

// Angular Material.
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage: string = '';

          if (error.error instanceof ErrorEvent) {
            // Client side error.
            errorMessage = error.error.message;
          } else {
            // Server side error.
            errorMessage = error.status + ': ' + error.message;
          }

          this.showErrorMessage(errorMessage);

          return throwError(errorMessage);
        })
      );
  }

  public showErrorMessage(errorMessage: string): void {
    this.snackBar.open(errorMessage, 'OK');
  }

}
