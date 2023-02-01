export class User {
    constructor(private accessToken: string, private refreshToken: string, private expirationDate: Date) {}

    get expireDate(): Date {
        return this.expirationDate;
    }

    get getUserToken(): string {
        return this.accessToken;
    }

    get getRefreshToken(): string {
        return this.refreshToken;
    }

    set setexpireDate(value: any) {
        this.expirationDate = value;
    }

    set setUserToken(value: any) {
        this.accessToken = value;
    }

    set setRefreshToken(value: any) {
        this.refreshToken = value;
    }
}
