import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { Credentials, CredentialsService } from './credentials.service';
import { AlertService } from './utils/alert.service';
import { BasicResponse } from '../models/utils/basic-response.model';
import { environment } from 'src/environments/environment';
import { User } from '../models/utils/auth-user.model';

const TOKEN_KEY = 'FACTORY_STARTER_KIT';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    timeoutInterval: any;
    logoutInterval: any;

    constructor(
        private http: HttpClient,
        private credentialsService: CredentialsService,
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService
    ) {}

    signin = (credentials: any): Observable<BasicResponse> => this.http.post<BasicResponse>(`${environment.api}/public/login`, credentials);

    formatUser(response: BasicResponse): User {
        const token: any = jwtDecode(response.data?.accessToken);
        const expirationDate = new Date(token.exp * 1000);
        return new User(response.data?.accessToken, response.data?.refreshToken, expirationDate);
    }

    saveUserCredentials(response: BasicResponse, remember?: boolean): void {
        const credentials: Credentials = {
            accessToken: response.data?.accessToken,
            refreshToken: response.data?.refreshToken
        };
        this.credentialsService.setCredentials(credentials);
    }

    getUserFromLocalStorage(): User | null {
        const storedData = sessionStorage.getItem(TOKEN_KEY);
        if (storedData) {
           
            const userData = JSON.parse(storedData);
            const expirationdate = new Date(userData?.expirationDate);
            return new User(userData?.accessToken, userData?.refreshToken, expirationdate);
        }
        return null;
    }

    onLogout(showAlert = true): void {
        this.alertService.showSwal('CONFIRM', () => {
            this.credentialsService.setCredentials();
            this.router.navigate([this.route.snapshot.queryParams['redirect'] || '/'], { replaceUrl: true });
            if (showAlert) {
                this.alertService.showAlert({ status: 'OK', titre: 'Déconnexion', message: 'Déconnecté' });
            }
        });
    }
}
