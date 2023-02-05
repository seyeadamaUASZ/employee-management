import { EmployeeTypeEnum } from '../enums/EmployeeType.enum';

export interface ISearchRequestForm {
    searchText?: string;
    requestFormStatus: EmployeeTypeEnum;
    statusList?: EmployeeTypeEnum[];
    username?: string;
    firstName?:string;
    lastName?:string;
}