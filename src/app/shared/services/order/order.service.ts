// Angular.
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// App environment.
import { environment } from '@env/environment';

// App models.
import { IOrder, IOrderItem } from '@shared/models/order.model';

const ORDERS_API_URL: string = environment.apiURL + '/orders';

@Injectable({providedIn: 'root'})
export class OrderService {
  constructor(private http: HttpClient) {}

  public getOrders(): Observable<any> {
    return this.http.get(ORDERS_API_URL)
      .pipe(
        map((res) => res),
        catchError((err) => throwError(err))
      );
  }

  public getCustomerOrders(customerId: number): Observable<any> {
    return this.http.get(ORDERS_API_URL + '?customerId=' + customerId)
      .pipe(
        map((res) => res),
        catchError((err) => throwError(err))
      );
  }
}
