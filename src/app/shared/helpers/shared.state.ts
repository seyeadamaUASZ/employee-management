import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class SharedState {
    private isLoading: Subject<boolean> = new Subject<boolean>();
    private employeeForm$: BehaviorSubject<any> = new BehaviorSubject<any>(null);


    constructor(private router: Router) {}

    getIsLoading = (): Subject<boolean> => this.isLoading;

    setIsLoading = (value: boolean): void => {
        this.isLoading.next(value);
    };

    setEmployeeForm(value: any): void {
        this.employeeForm$.next(value);
    }

   

    getEmployeeForm(): Observable<any> {
        return this.employeeForm$.asObservable();
    }

   

    // showKycForm(toRoute: string, backRoute: string, kycForm: any, isGuest: boolean, fromRouteTitle?: string): void {
    //     if (toRoute && kycForm) {
    //         isGuest
    //             ? this.setKycFormAsGuest({ kycForm, backRoute, fromRouteTitle })
    //             : this.setKycForm({ kycForm, backRoute, fromRouteTitle });
    //         this.router.navigateByUrl(toRoute);
    //     }
    // }
}
