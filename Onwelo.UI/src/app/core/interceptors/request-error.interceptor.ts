import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

export const requestErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 400:
            toastrService.error('Bad reqeust sent to API');
            break;
        
        default:
            toastrService.error('There were some problems with communication with API', 'Error')
            break;
      }

      return throwError(() => error);
    })
  );
};
