// Angular.
import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Angular Material.
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// Third-party.
import { TranslateService } from '@ngx-translate/core';

// App models.
import { ICustomer, IOrder, IOrderItem } from '@app/shared';

// App pipes.
import { FormatCurrencyPipe } from '@app/shared';

// App services.
import { OrderService } from '@app/shared';

@Component({
  selector: 'app-customer-data',
  templateUrl: './customer-data.component.html',
  styleUrls: ['./customer-data.component.scss']
})
export class CustomerDataComponent implements OnInit {
  public customer: ICustomer = this.data.customer;

  public orders: Observable<IOrder[] | any>;
  public customerOrderItems: IOrderItem[] = [];
  public totalValue: number = 0;
  public tableColumns: string[] = ['value', 'item'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ordersService: OrderService,
    protected translate: TranslateService
  ) {}

  ngOnInit() {
    this.getCustomerOrders();
  }

  private getCustomerOrders(): void {
    this.customerOrderItems.length = 0;

    this.ordersService.getCustomerOrders(this.customer.id).subscribe(res => {
      this.orders = res;
      this.customerOrderItems = res.map(r => r.items);
      this.totalValue = res[0].total;
    });
  }

  // NOTA:
  // O total presente no objeto ORDER não bate!
  public getTotalSpent(): number {
    const total: number = this.customerOrderItems.reduce((sum, current) => sum + current[0].value, 0);
    return total;
  }
}
