import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { BasicResponse } from 'src/app/shared/models/utils/basic-response.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class DepartmentService{
    
    constructor(private http:HttpClient){}

    getAllDepartments = (): Observable<BasicResponse> =>
      this.http.get<BasicResponse>(`${environment.apiDep}/department`);

}