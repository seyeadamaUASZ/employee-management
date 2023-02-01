/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { GlobalConstant } from 'src/app/core/constants/global.constant';

export interface Credentials {
    // Personnalisez les informations d'identification reçues ici
    accessToken: string;
    refreshToken: string;
}

/**
 * Fournit le stockage des informations d'authentification.
 */
@Injectable({
    providedIn: 'root'
})
export class CredentialsService {
    private _credentials: Credentials | null = null;

    constructor() {
        const savedCredentials =
            sessionStorage.getItem(GlobalConstant.credentialsKey) ?? localStorage.getItem(GlobalConstant.credentialsKey);
        if (savedCredentials) {
            this._credentials = JSON.parse(savedCredentials);
        }
    }

    /**
     * Obtient les informations d'identification de l'utilisateur.
     * @return Les informations d'identification de l'utilisateur ou null si l'utilisateur n'est pas authentifié.
     */
    get credentials(): Credentials | null {
        return this._credentials;
    }

    /**
     * Obtient le token contenu dans informations d'identification de l'utilisateur.
     * @return Le token decodé contenu dans les informations d'identification de l'utilisateur ou null si l'utilisateur n'est pas authentifié.
     */
    get accessToken(): any | null {
        return this._credentials?.accessToken ? jwt_decode(this._credentials.accessToken) : null;
    }

    get refreshToken(): any | null {
        return this._credentials?.refreshToken ? jwt_decode(this._credentials.refreshToken) : null;
    }

    get undecodeAccessToken(): any | null {
        return this._credentials?.accessToken ? this._credentials.accessToken : null;
    }

    get undecodeRefreshToken(): any | null {
        return this._credentials?.refreshToken ? this._credentials.refreshToken : null;
    }

    get fullName(): string {
        return this.accessToken?.FullName ?? 'Unknow';
    }

    get permissions(): string[] {
        return this.accessToken?.PERMISSIONS ?? [];
    }

    /**
     * Obtient le token contenu dans informations d'identification de l'utilisateur.
     * @return Le token decodé contenu dans les informations d'identification de l'utilisateur ou null si l'utilisateur n'est pas authentifié.
     */
    get expirationTime(): number | null {
        return this.accessToken?.exp;
    }

    get refreshTokenExpirationTime(): number | null {
        return this.refreshToken?.exp;
    }

    get storage(): any {
        return localStorage.getItem(GlobalConstant.credentialsKey) ? localStorage : sessionStorage;
    }

    /**
     * Vérifie si l'utilisateur est authentifié.
     * @return True si l'utilisateur est authentifié.
     */
    isAuthenticated(): boolean {
        return !!this.credentials;
    }

    /**
     * Vérifie si l'utilisateur est authentifié.
     * @return True si l'utilisateur est authentifié.
     */
    isExpiredToken(): boolean {
        if (this.isAuthenticated()) {
            const currentDate: number = new Date().getTime() / 1000;
            return this.expirationTime ? this.expirationTime < currentDate : true;
        } else {
            return true;
        }
    }

    isExpiredRefreshToken(): boolean {
        if (this.isAuthenticated()) {
            const currentDate: number = new Date().getTime() / 1000;
            return this.refreshTokenExpirationTime ? this.refreshTokenExpirationTime < currentDate : true;
        } else {
            return true;
        }
    }

    /**
     * Définit les informations d'identification de l'utilisateur.
     * Les informations d'identification peuvent être conservées entre les sessions en définissant le paramètre `remember` à true.
     * Sinon, les informations d'identification ne sont conservées que pour la session en cours.
     * @param credentials Les informations d'identification de l'utilisateur.
     * @param remember True pour mémoriser les informations d'identification entre les sessions.
     */
    setCredentials(credentials?: Credentials, remember?: boolean): void {
        this._credentials = credentials ?? null;

        if (credentials) {
            const storage = remember ? localStorage : sessionStorage;
            storage.setItem(GlobalConstant.credentialsKey, JSON.stringify(credentials));
        } else {
            sessionStorage.removeItem(GlobalConstant.credentialsKey);
            localStorage.removeItem(GlobalConstant.credentialsKey);
        }
    }

    refreshCredentials(credentials?: Credentials): void {
        const storage = this.storage;
        storage.setItem(GlobalConstant.credentialsKey, JSON.stringify(credentials));
    }

    /**
     * permet de deconnecter le user donc de supprimer ces informations d'authentification
     */
    removeCredentials(): void {
        sessionStorage.removeItem(GlobalConstant.credentialsKey);
        localStorage.removeItem(GlobalConstant.credentialsKey);
    }
}
