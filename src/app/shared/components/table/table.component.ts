import { Component, OnInit,AfterViewInit,Input,ViewChild,Output,EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { GlobalConstant } from 'src/app/core/constants/global.constant';
import { IPagination } from '../../models/utils/page-data.model';
import { MatSort } from '@angular/material/sort';
import { TableButtonAction } from '../../models/utils/table-button-action';
import { TableColumn } from '../../models/utils/table-column';
import { CredentialsService } from '../../services/credentials.service';
import { AlertService } from '../../services/utils/alert.service';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Logger } from 'src/app/core/services/logger.service';
import { getKeyName } from '../../models/enums/enum-utils';
import { UserPermissionEnum } from '../../models/enums/user-permission.enum';


const LOGGER = new Logger('TableComponent');
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent  implements OnInit, AfterViewInit {
    panelOpenState = false;
    activeUser = true;
    actionButton = GlobalConstant.actionButton;
   

    @Input() pageData: IPagination = {
        page: GlobalConstant.pagination.defaultPage,
        size: GlobalConstant.pagination.defaultSize,
        length: GlobalConstant.pagination.defaultLength
    };
    @Input() pageSizeOptions = GlobalConstant.pagination.pageSizeOptions;

    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort!: MatSort;


    @Output() action: EventEmitter<TableButtonAction> = new EventEmitter<TableButtonAction>();
    @Output() pageChangeEvent: EventEmitter<IPagination> = new EventEmitter<IPagination>();
    @Output() filterEvent?: EventEmitter<string> = new EventEmitter<string>();

    @Input() columns: Array<TableColumn> = [];
    actions: Array<any> = [];
    @Input() dataset: Array<any> = [];

    // this property needs to have a setter, to dynamically get changes from parent component
    @Input() set tableData(data: any[]) {
        this.setDataSource(data);
    }

    @Input() set tableActions(actions: any[]) {
        this.setUserAuthorizeActions(actions);
    }

    @Input() hasSearchForm = false;
    @Input() hasFilterInput = false;
    @Input() hasActions = false;
    @Input() searchForm!: FormGroup;

    dataSource!: MatTableDataSource<any>;

    selection = new SelectionModel<any>(true, []);
    displayedColumns: string[] = [];


  constructor(private crdService: CredentialsService) { }
  

  ngOnInit(): void {
    LOGGER.debug(this.tableData);
        // set checkbox column
        //this.displayedColumns.push('select');

        // set table columns
        this.displayedColumns = this.displayedColumns.concat(this.columns.map((x: TableColumn) => x.columnDef)); // pre-fix static

        // add action column
        if (this.hasActions && this.actions.length > 0) {
            this.displayedColumns.push('actions');
        }
        //this.dataSource = new MatTableDataSource<any>(this.dataset);

        // set pagination
        //this.dataSource.paginator = this.paginator;
  }


  OnPageChange(event: any): void {
    this.pageData = { ...this.pageData, page: event.pageIndex, size: event.pageSize };
    this.pageChangeEvent.emit(this.pageData);
}

onTableAction(e: any, action: any, value: any): void {
    console.log(e);
    console.log(action);
    console.log(value);

    this.action.emit({
        name: action,
        value
    });
}

isAllSelected(): boolean {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle(): void {
  this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
}

ngAfterViewInit(): void {
  this.dataSource.sort = this.sort;
}

setDataSource(data: any): void {
  this.dataSource = new MatTableDataSource<any>(data);

  LOGGER.debug(this.dataSource.data);
}

setPageData(pageData: any): void {
  console.log(pageData);
}

applyFilter(event: any): void {
  const filterValue = (event.target as HTMLInputElement).value;
  //this.filterEvent.emit(filterValue.trim().toLowerCase());
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

setUserAuthorizeActions(actions: any[]): void {
  if (actions.length > 0) {
      this.actions = actions.filter(action => {
          const result = this.isAllowed(action?.permissions);
          console.log('result', result);

          return result;
      });
  }
}


isAllowed(permissions: any): boolean {
  const authorizedRoles: string[] = permissions.map(
      (permission: any) => (permission === '*' ? permission : getKeyName(UserPermissionEnum, permission)) as string
  );
  const userRoles = this.crdService.permissions;

  console.log(authorizedRoles);
  console.log(userRoles);
  if (authorizedRoles.includes('*')) {
      return true;
  }
  if (authorizedRoles.includes(userRoles[0])) {
      console.log(getKeyName(UserPermissionEnum, userRoles[0]));

      return true;
  } else {
      return false;
  }
}


}
