import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EqualPipe } from '../pipe/equal-value.pipe';


@NgModule({
  declarations: [
    TableComponent,
    EqualPipe
  ],
  imports: [
    CommonModule,
    MaterialModule ,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule
    
  ],
  exports:[
    TableComponent,
    MaterialModule,
    ReactiveFormsModule,
    EqualPipe
  ]
})
export class SharedModule { }

