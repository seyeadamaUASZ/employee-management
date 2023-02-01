import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CredentialsService } from 'src/app/shared/services/credentials.service';
import { Logger } from '../services/logger.service';

const LOGGER = new Logger('AuthGuard');

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private credentialsService: CredentialsService, private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.credentialsService.isExpiredToken()) {
            return true;
        } else {
            LOGGER.debug('Not authenticated, redirecting and adding redirect url...');
            this.router.navigate(['/'], {
                queryParams: { redirect: state.url },
                replaceUrl: true
            });
            return false;
        }
    }
}
