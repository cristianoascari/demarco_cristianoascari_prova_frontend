// Angular.
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

// RxJS.
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

// Angular Material.
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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
export class CustomersComponent implements OnInit {
  public searchControl: FormControl = new FormControl();

  public customers: Observable<ICustomer[] | any>;
  public customersFull: ICustomer[];

  public tableColumns: string[] = [];
  public extraTableCollumns: string[] = ['viewButton'];
  public totalCustomers: number = 0;

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

    this.customers.subscribe(c => this.totalCustomers = c.length);
  }

  public clearFilter(): void {
    this.searchControl.setValue('');
  }

  private getTableColumnsNames(): void {
    this.tableColumns.length = 0;

    const interfaceKeys: string[] = this.customersFull.length ? Object.keys(this.customersFull[0]) : [];

    interfaceKeys.map(key => this.tableColumns.push(this.translate.instant('fields.' + key) || key));

    this.tableColumns.push('_buttons');

    // this.tableColumns.concat(this.extraTableCollumns);
  }

  public getCustomerValue(customer: ICustomer, columnIndex: number): string {
    const customerKeys: string[] = Object.keys(this.customersFull[0]);
    return customer[customerKeys[columnIndex]];
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
}
