import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Logger } from '../services/logger.service';
import { environment } from 'src/environments/environment';

const LOGGER = new Logger('ErrorHandlerInterceptor');

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(catchError((error: HttpErrorResponse) => this.errorHandler(error)));
    }

    private errorHandler(error: HttpErrorResponse): Observable<HttpEvent<any>> {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
            errorMsg = `Client Side Error => ${error.error.message}`;
        } else {
            errorMsg = `Server Side Error => Code: ${error.status},  Message: ${error.message}`;
        }

        if (!environment.production) {
            LOGGER.error('Request error', errorMsg);
        }

        throw error;
    }
}
