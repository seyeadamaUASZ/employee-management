import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from '../../services/department.service';
import { EmployeeService } from '../../services/employee.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AlertService } from 'src/app/shared/services/utils/alert.service';
import { enumToList } from 'src/app/shared/models/enums/enum-utils';
import { EmployeeTypeEnum } from 'src/app/shared/models/enums/EmployeeType.enum';
import { Logger } from 'src/app/core/services/logger.service';
import { Employee } from '../../models/employee.model';
import { Router } from '@angular/router';


const LOGGER = new Logger('EmployeeFormComponent');
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!:FormGroup;
  datadeps:any;
  destroy$: Subject<boolean> = new Subject();
  employeeTypes: any[] = enumToList(EmployeeTypeEnum);
  constructor(private fb:FormBuilder,
    private employeeS:EmployeeService,private dialog:MatDialog,
    private dialogRef:MatDialogRef<EmployeeFormComponent>,
    private departmentService:DepartmentService,
    private alertService:AlertService,private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.allDeps();
  }

  initForm(){
    this.employeeForm=this.fb.group({
      username:['',Validators.email],
      firstName:['',Validators.required],
      birthday:['',Validators.required],
      lastName:['',Validators.required],
      departmentId:['',Validators.required],
      employeeType:['',Validators.required]
    })
  }


  close(){
    this.dialogRef.close(true)
  }

  allDeps(): void {
    this.departmentService
        .getAllDepartments()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
            next: response => {
                if (response.status === 200) {
                    
                    this.datadeps = response.data
                } else {
                    this.alertService.showSwal('KO', null, 'EMP', 'Impossible de récupérer la liste des départements.');
                }
            },
            error: e => {
                this.alertService.showAlert({
                    message: 'Impossible de récupérer la liste des départements. \nMerci de réessayer ultérieurement.',
                    status: 'KO',
                    titre: 'KYC'
                });
            }
        });
}

  

  onSubmitForm(){
    console.log('form value '+this.employeeForm.value)
    let data:Employee={
        lastName:this.employeeForm.value.lastName,
        firstName:this.employeeForm.value.firstName,
        username:this.employeeForm.value.username,
        birthday:this.employeeForm.value.birthday,
        departmentId:this.employeeForm.value.departmentId,
        employeeType:this.employeeForm.value.employeeType
    }
    this.employeeS
    .addEmployee(data)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
        next: response => {
            if (response.status === 200) {
                this.alertService.showSwal(
                    'OK',
                    null,
                    'EMP',
                    `Employé enregistré avec succès!`
                );
                this.close();
                window.location.reload()
            } else {
                this.alertService.showSwal(
                    'KO',
                    null,
                    'EMP',
                    `Erreur lors de l'enregistrement`
                );
            }
            LOGGER.debug('Saved request', response);
        },
        error: e => {
            this.alertService.showSwal(
                'KO',
                null,
                'EMP',
                `Erreur sur l'ajout de l'employé`
            );
        }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }



}
