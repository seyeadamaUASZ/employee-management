import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutComponent } from './layout.component';
import { CoreModule } from 'src/app/core/core.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';



@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    CoreModule
  ],
  exports:[
    RouterModule
  ]
})
export class LayoutModule { }
