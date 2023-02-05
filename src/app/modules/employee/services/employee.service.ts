import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, delay, 
    Observable,tap,map, switchMap,take } from "rxjs";
import { environment } from "src/environments/environment";
import { Employee } from "../models/employee.model";
import { BasicResponse } from "src/app/shared/models/utils/basic-response.model";


@Injectable()
export class EmployeeService{
   constructor(private http:HttpClient){}
   
   private _loading$ = new BehaviorSubject<boolean>(false)
   private _employees$ = new BehaviorSubject<Employee[]>([]);
   
   private lastEmployeesLoad=0;
   get loading$():Observable<boolean>{
      return this._loading$.asObservable();

   }
   get employees$():Observable<Employee[]>{
     return this._employees$.asObservable();
   } 


   private setLoadingStatus(loading:boolean){
    this._loading$.next(loading);
   }

   getEmployees(){
    //le temps auquel ça était chargé et maintenant
    if(Date.now() - this.lastEmployeesLoad <=300000){
        return;
    }
    this.setLoadingStatus(true);
    this.http.get<Employee[]>(`${environment.api}/api/employees`)
    .pipe(
        delay(1000),
        tap(employees=>{
            this.lastEmployeesLoad=Date.now()
            this.setLoadingStatus(false)
           this._employees$.next(employees)
        })
    ).subscribe();
}


getAllEmployees = (): Observable<BasicResponse> =>
this.http.get<BasicResponse>(`${environment.api}/api/employee`);

addEmployee = (dto: Employee): Observable<BasicResponse> =>
this.http.post<BasicResponse>(`${environment.api}/api/employee`, dto);

getEmployee=(username:any):Observable<BasicResponse> =>
this.http.get<BasicResponse>(`${environment.api}/api/employee/find/${username}`);




}