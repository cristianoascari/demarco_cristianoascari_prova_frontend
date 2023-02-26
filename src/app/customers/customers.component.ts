// Angular.
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

// RxJS.
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

// Angular Material.
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material';

// Third-party.
import { TranslateService } from '@ngx-translate/core';

// App models.
import { ICustomer } from '@app/shared';

// App components.
import { CustomerDataComponent } from '@app/customers/customer-data/customer-data.component';
import { CustomerDeleteComponent } from '@app/customers/customer-delete/customer-delete.component';

// App services.
import { CustomerService } from '@app/shared/';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements AfterViewInit, OnInit {
  public searchControl: FormControl = new FormControl();

  public dataSource: MatTableDataSource<any>;
  public customers: Observable<ICustomer[] | any>;
  public customersFull: ICustomer[];

  public tableColumns: string[] = [];
  public tableColumnsRef: string[] = ['id', 'name', 'age', 'city'];
  public totalCustomers: number = 0;

  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    setTimeout(() => { this.dataSource.sort = sort; }, 1500);
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public paginatorEvent: PageEvent;
  public paginatorIndex: number = 0;
  public paginatorLength: number = 0;
  public paginatorSize: number = 5;
  public paginatorSizeOptions: number[] = [5, 10, 25];

  constructor(
    private customersService: CustomerService,
    public dialog: MatDialog,
    private router: Router,
    protected translate: TranslateService
  ) {}

  ngOnInit() {
    this.getCustomers();

    this.translate.onLangChange.subscribe((event: any) => {
      this.getTableColumnsNames();
    });
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
  }

  private getCustomers(): void {
    this.customersService.getCustomers().subscribe(res => {
      this.customersFull = res;
      this.customers = res;

      this.filterCostumers();

      this.getTableColumnsNames();
    });
  }

  private filterCostumers(): void {
    this.customers = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        return this.customersFull.filter(customer => {
          const customerName: string = customer.name.toLowerCase().trim();
          const customerCity: string = customer.city.toLowerCase().trim();
          const searchValue: string = value.toLowerCase().trim();

          return customerName.includes(searchValue) || customerCity.includes(searchValue);
        });
      })
    );

    this.customers.subscribe(customer => {
      this.totalCustomers = customer.length;

      this.dataSource = new MatTableDataSource<any>(customer);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
        const refColumnName: string = this.tableColumnsRef[this.tableColumns.findIndex(c => c === sortHeaderId)];
        const value: any = data[refColumnName];

        return typeof value === 'string' ? value.toUpperCase() : value;
      };
      this.paginatorLength = this.totalCustomers;
    });
  }

  public clearFilter(): void {
    this.searchControl.setValue('');
  }

  private getTableColumnsNames(): void {
    // Busca automãtica prejudicando a ordem das colunas.
    /*this.tableColumns.length = 0;

    const interfaceKeys: string[] = this.customersFull.length ? Object.keys(this.customersFull[0]) : [];

    interfaceKeys.map(key => this.tableColumns.push(this.translate.instant('fields.' + key) || key));*/

    this.tableColumns = this.tableColumnsRef.map(ref => this.translate.instant(`fields.${ref}`));

    this.tableColumns.push('_buttons');
  }

  public getCustomerValue(customer: ICustomer, columnIndex: number): string {
    const currentKey: string = this.getCurrentTableColumnKey(columnIndex);
    return customer[currentKey];

    // Busca automãtica prejudicando a ordem das colunas.
    /*const customerKeys: string[] = Object.keys(this.customersFull[0]);
    return customer[customerKeys[columnIndex]];*/
  }

  public getCurrentTableColumnKey(columnIndex): string {
    return this.tableColumnsRef[columnIndex];
  }

  public addNewCustomer(): void {
    this.router.navigate(['new-customer']);
  }

  public viewCustomer(customer: ICustomer): void {
    this.openCustomerDialog(CustomerDataComponent, customer);
  }

  public editCustomer(customer: ICustomer): void {
    this.router.navigate([`edit-customer/${customer.id}`]);
  }

  public deleteCustomer(customer: ICustomer): void {
    this.openCustomerDialog(CustomerDeleteComponent, customer, true);
  }

  private openCustomerDialog(
    viewReference: any,
    customer: ICustomer,
    updateDataAfterClose: boolean = false
  ): void {
    const dialogRef: MatDialogRef<any> = this.dialog.open(viewReference, {
      data: {customer},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (updateDataAfterClose) {
        this.getCustomers();
      }
    });
  }

  public handlePageEvent(e: PageEvent): void {
    this.paginatorEvent = e;
    this.paginatorIndex = e.pageIndex;
    this.paginatorLength = e.length;
    this.paginatorSize = e.pageSize;
  }

  public setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.paginatorSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
}
