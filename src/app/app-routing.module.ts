import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { LoginComponent } from './modules/auth/components/login/login.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  { path:'layout',
    component:LayoutComponent,
    children:[{
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
