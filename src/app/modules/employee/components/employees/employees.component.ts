import { Component, OnInit,ChangeDetectionStrategy,ViewChild } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { GlobalConstant } from 'src/app/core/constants/global.constant';
import { IPagination } from 'src/app/shared/models/utils/page-data.model';
import { MatPaginator } from '@angular/material/paginator';
import { SharedState } from 'src/app/shared/helpers/shared.state';
import { AlertService } from 'src/app/shared/services/utils/alert.service';
import { CredentialsService } from 'src/app/shared/services/credentials.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BasicResponse } from 'src/app/shared/models/utils/basic-response.model';
import { UserPermissionEnum } from 'src/app/shared/models/enums/user-permission.enum';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class EmployeesComponent implements OnInit {
  
  loading$!:Observable<boolean>;
  employees$!:Observable<Employee[]>;

  destroy$: Subject<boolean> = new Subject();
    showSendLinkButton = false;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    columns: any[] = [];
    actions: any[] = [];
    data: any[] = [];
    pageData: IPagination = { page: 0, size: 3, length: 0 };
    pageSizeOptions = [5, 15, 30, 50];
    //searchParams!: ISearchRequestForm;

    actionButton = GlobalConstant.actionButton;

    title = '';
    currentListRoute = '';
    routeTitle = '';
  constructor(private employeeService:EmployeeService,
    private sharedState: SharedState,
        private alertService: AlertService,
        private dialog: MatDialog,
        private router: Router,
        private crdService: CredentialsService) {


          this.actions = [
            { action: this.actionButton.view, permissions: ['*'] },
            { action: this.actionButton.validate, permissions: [UserPermissionEnum.ADMIN] },
            { action: this.actionButton.cancel, permissions: [UserPermissionEnum.ADMIN] },
            { action: this.actionButton.to_modify, permissions: [UserPermissionEnum.ADMIN] }
        ];
         }

  ngOnInit(): void {
    //this.initObservable();
    //this.employeeService.getEmployees()
    this.onInitColumns()
    this.allEmployees();
  }

  initObservable(){
    this.loading$ = this.employeeService.loading$;
    this.employees$=this.employeeService.employees$;
  }


  allEmployees(): void {
    this.employeeService
        .getAllEmployees()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
            next: response => {
                if (response.status === 200) {
                    this.pageData = {
                        page: response.data?.pageable?.pageNumber,
                        size: response.data?.pageable?.pageSize,
                        length: response.data?.totalElements
                    };
                    this.data = response.data

                    console.log("element data"+ this.data);
                } else {
                    this.alertService.showSwal('KO', null, 'EMP', 'Impossible de récupérer la liste des employés.');
                }
            },
            error: e => {
                this.alertService.showAlert({
                    message: 'Impossible de récupérer la liste des employés. \nMerci de réessayer ultérieurement.',
                    status: 'KO',
                    titre: 'KYC'
                });
            }
        });
}








onInitColumns(): void {
  this.columns = [
      { columnDef: 'lastName', header: 'Nom' },
      { columnDef: 'firstName', header: 'Prénom' },
      { columnDef: 'username', header: 'Email' },
      { columnDef: 'birthday', header: 'Date de Naissance',isDate:true },
      { columnDef: 'employeeType', header: 'Type d\'embauche' }
  ];
}

ngOnDestroy(): void {
  this.destroy$.next(true);
  this.destroy$.complete();
}

onPageChange(event: IPagination): void {
  this.pageData = { ...this.pageData, page: event.page, size: event.size };
  this.allEmployees();
}

onApplyFilter(event: any): void {
  //this.searchParams = { ...this.searchParams, searchText: event };
  this.allEmployees();
}

createEmployee(){
  this.dialog.open(EmployeeFormComponent,{
    width:'850px',
    disableClose:true
  })
}


onTableAction(event: any): void {
  let res: Observable<BasicResponse> = new Observable<BasicResponse>();

  //console.log('event',JSON.stringify(event));

  
  /*if (event.name === this.actionButton.view) {
      res = this.requestFormService.requestFormById(event.value?.id);

      res.pipe(takeUntil(this.destroy$)).subscribe({
          next: response => {
              if (response.status === 200) {
                  this.sharedState.showKycForm('/kyc-requests/details', this.currentListRoute, response, false, this.routeTitle);
              } else {
                  this.alertService.showSwal(
                      'KO',
                      null,
                      'KYC',
                      `La demande KYC n'a pas pu être traitée. \nMerci de réessayer ultérieurement.`
                  );
              }
          },
          error: e => {
              this.alertService.showSwal(
                  'KO',
                  null,
                  'KYC',
                  `La demande KYC n'a pas pu être traitée. \nMerci de réessayer ultérieurement.`
              );
          }
      });
  } else if ([this.actionButton.view_file, this.actionButton.put_final_doc].includes(event.name)) {
      if (this.actionButton.view_file === event.name) {
          this.requestFormService
              .getFinalDoc(event.value?.id)
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                  next: response => {
                      if (response.status === 200) {
                          this.dialog.open(PreviewFileComponent, {
                              maxWidth: '90vw',
                              maxHeight: '90vh',
                              height: '90%',
                              width: '90%',
                              data: { file: response.data }
                          });
                      } else {
                          this.alertService.showAlert({
                              status: 'KO',
                              message: 'Le PV final sera bientôt disponible.\n Merci de réessayer ultérieurement.',
                              titre: 'PV final'
                          });
                      }
                  },
                  error: e =>
                      this.alertService.showAlert({
                          status: 'KO',
                          message: 'Le PV final sera bientôt disponible.\n Merci de réessayer ultérieurement.',
                          titre: 'PV final'
                      })
              });
      } else {
          this.dialog.open(KycFormUploadPvComponent, {
              data: { requestForm: event.value },
              maxWidth: '75vw',
              maxHeight: '50vh',
              height: '50%',
              width: '75%'
          });
      }
  } else {
      this.alertService.showSwal(
          'CONFIRM',
          (result: any) => {
              if (result) {
                  if (event.name === this.actionButton.unblock || event.name === this.actionButton.block) {
                      res = this.requestFormService.allowNewModification(event.value?.id);
                  } else {
                      // eslint-disable-next-line no-case-declarations
                      const rq: IProcessRequestForm = {
                          reason: result?.value,
                          id: event.value?.id,
                          requestFormStatus:
                              event.name === this.actionButton.validate
                                  ? getKeyName(RequestFormStatusEnum, RequestFormStatusEnum.VALIDATED)
                                  : event.name === this.actionButton.cancel
                                  ? getKeyName(RequestFormStatusEnum, RequestFormStatusEnum.CANCELED)
                                  : getKeyName(RequestFormStatusEnum, RequestFormStatusEnum.TO_MODIFY)
                      };

                      res = this.requestFormService.processAkycForm(rq);
                  }
              }

              res.pipe(takeUntil(this.destroy$)).subscribe({
                  next: response => {
                      if (response.status === 200) {
                          this.alertService.showSwal('OK', null, 'KYC', `La demande KYC a été traitée avec succès!`);

                          if (event.name === this.actionButton.cancel) {
                              this.router.navigate(['/kyc-requests/cancelled']);
                          } else if (event.name === this.actionButton.validate || event.name === this.actionButton.to_modify) {
                              this.router.navigate(['/kyc-requests/processed']);
                          } else {
                              this.allRequestForms();
                          }
                      } else {
                          this.alertService.showSwal(
                              'KO',
                              null,
                              'KYC',
                              `La demande KYC n'a pas pu être traitée. \nMerci de réessayer ultérieurement.`
                          );
                      }
                  },
                  error: e => {
                      this.alertService.showSwal(
                          'KO',
                          null,
                          'KYC',
                          `La demande KYC n'a pas pu être traitée. \nMerci de réessayer ultérieurement.`
                      );
                  }
              });
          },
          '',
          '',
          event.name === this.actionButton.cancel || event.name === this.actionButton.to_modify
      );*/
  }

}
