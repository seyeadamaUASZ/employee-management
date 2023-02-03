import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { LoginComponent } from './modules/auth/components/login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {path:'login',component:LoginComponent},
  { path:'layout',
    component:LayoutComponent,
    children:[
      {
        path:'',
        component:DashboardComponent
      },
      {
      path:'employee',
      loadChildren:()=>import('./modules/employee/employee.module').then(m=>m.EmployeeModule)
    }],
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
