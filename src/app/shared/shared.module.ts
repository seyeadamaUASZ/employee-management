import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';


@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule ,
    ReactiveFormsModule
    
  ],
  exports:[
    TableComponent,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }

