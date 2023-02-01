import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { CredentialsService } from 'src/app/shared/services/credentials.service';
import { AlertService } from 'src/app/shared/services/utils/alert.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(private credentialsService: CredentialsService, private alertService: AlertService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const authorizedRoles = route.data['permissions'];
        const userRoles = this.credentialsService.permissions;

        console.log(authorizedRoles);
        console.log(userRoles);
        if (authorizedRoles.includes('*')) {
            return true;
        }
        if (authorizedRoles.includes(userRoles[0])) {
            return true;
        } else {
            this.alertService.showAlert({
                status: 'ACCESS_DENIED',
                message: "Vous n'avez pas les permissions nécessaires !",
                titre: 'Autorisations'
            });
            return false;
        }
    }
}
