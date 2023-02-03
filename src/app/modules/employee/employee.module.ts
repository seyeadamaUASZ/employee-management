import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeesComponent } from './components/employees/employees.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeService } from './services/employee.service';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { DepartmentService } from './services/department.service';


@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeFormComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule
  ],
  providers:[EmployeeService,DepartmentService]
})
export class EmployeeModule { }
