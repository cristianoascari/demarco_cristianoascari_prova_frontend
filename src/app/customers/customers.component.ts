// Angular.
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

// Angular Material.
import { MatDialog } from '@angular/material/dialog';

// Third-party.
import { TranslateService } from '@ngx-translate/core';

// App models.
import { ICustomer } from '@app/shared';

// App components.
import { CustomerDataComponent } from './customer-data/customer-data.component';

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

  private getTableColumnsNames(): void {
    this.tableColumns.length = 0;

    const interfaceKeys: string[] = this.customersFull.length ? Object.keys(this.customersFull[0]) : [];

    interfaceKeys.map(key => this.tableColumns.push(this.translate.instant('fields.' + key) || key));

    // this.tableColumns.concat(this.extraTableCollumns);
  }

  public getCustomerValue(customer: ICustomer, columnIndex: number): string {
    const customerKeys: string[] = Object.keys(this.customersFull[0]);
    return customer[customerKeys[columnIndex]];
  }

  public viewCustomer(customer: ICustomer): void {
    this.dialog.open(CustomerDataComponent, {
      data: {customer},
    });
  }
}
