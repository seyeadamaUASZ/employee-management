import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { SharedState } from 'src/app/shared/helpers/shared.state';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(private sharedState: SharedState) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this.sharedState.setIsLoading(true);
        return next.handle(request).pipe(finalize(() => this.sharedState.setIsLoading(false)));
    }
}
