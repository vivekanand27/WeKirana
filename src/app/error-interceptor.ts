import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError( (error: HttpErrorResponse) => {
        console.log(error);
        let errorMessage = 'An unknown error occured.';
        if (error.error.message) {
          errorMessage = error.error.message;
        }
        this.toastr.error(errorMessage, 'Error');
        return throwError(error);
      })
    );
  }
}
