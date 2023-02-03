import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CredentialsService } from 'src/app/shared/services/credentials.service';
import { AlertService } from 'src/app/shared/services/utils/alert.service';
import { GlobalConstant } from '../constants/global.constant';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private credentialsService: CredentialsService,
        private alertService: AlertService,
        private authService: AuthService,
        private route: Router
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): any {
        let authReq = req;
        let token: string | null = null;
         
         
         if (this.credentialsService.isExpiredToken()) {
             token = this.credentialsService.undecodeRefreshToken;
         } else if (this.credentialsService.isExpiredRefreshToken()) {
             token = this.credentialsService.undecodeAccessToken;
         }else{
            token=this.credentialsService.undecodeAccessToken;
         }
        

         if (this.route.url.includes('login') === false && token != null) {
             console.log('token for condition '+token)  
             authReq = req.clone({ headers: req.headers.set(GlobalConstant.tokenHeaderKey, `Bearer ${token}`) });
         }

        
        return next.handle(authReq).pipe(
            /*           map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && event.headers.get('refreshToken')) {
              const header = event.headers.get('refreshToken') ?? null;
              if (header != null) {
                  const response: AuthResponseData = JSON.parse(header);
                  this.authService.refreshUserCredentials(response);
              }
          }
          return event;
      }), */
            catchError(err => {
                switch (err?.status) {
                    case 401:
                        this.alertService.showAlert({
                            status: 'BAD_REQUEST',
                            titre: 'Authentification',
                            message: 'Votre session a expiré, veuillez vous reconnecter !'
                        });
                        this.authService.onLogout(false);

                        break;
                    case 403:
                        this.alertService.showAlert({
                            status: 'BAD_REQUEST',
                            titre: 'Authentification',
                            message: "Vous n'avez pas les droits nécessaires pour effectuer cette action !"
                        });
                        break;
                    case 404:
                        this.alertService.showAlert({
                            status: 'NOT_FOUND',
                            titre: 'Serveur',
                            message: 'La ressource demandée est indisponible !'
                        });
                        break;
                    /*
  default:
    this.alertService.showAlert({
      status: 'EXCEPTION',
      message: 'Le serveur est actuellement indisponible !',
      titre: 'Serveur'
    });
    break;
    */
                }
                const error = err.error.message || err.statusText;
                return throwError(error);
            })
        );
    }
}

export const httpInterceptorProviders = [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }];
