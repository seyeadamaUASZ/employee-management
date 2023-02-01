import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { EmployeesComponent } from './components/employees/employees.component';

const routes: Routes = [
  { path:'',
    canActivate:[AuthGuard],
    component:EmployeesComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
