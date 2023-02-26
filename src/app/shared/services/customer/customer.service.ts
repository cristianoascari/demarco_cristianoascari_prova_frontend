// Angular.
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// App environment.
import { environment } from '@env/environment';

// App models.
import { ICustomer } from '@shared/models/customer.model';

const CUSTOMERS_API_URL: string = environment.apiURL + '/customers';

@Injectable({providedIn: 'root'})
export class CustomerService {
  public httpOptions: any = this.buildHttpOptions();

  constructor(private http: HttpClient) {}

  public getCustomers(): Observable<any> {
    return this.http.get(CUSTOMERS_API_URL)
      .pipe(
        map((res) => res),
        catchError((err) => throwError(err))
      );
  }

  public getCustomerById(customerId: number): Observable<any> {
    return this.http.get(`${CUSTOMERS_API_URL}/${customerId}`)
      .pipe(
        map((res) => res),
        catchError((err) => throwError(err))
      );
  }

  public createCustomer(customer: ICustomer): Observable<any> {
    return this.http.post(
      CUSTOMERS_API_URL,
      JSON.stringify(customer),
      this.httpOptions
    ).pipe(
        map((res) => res),
        catchError((err) => throwError(err))
      );
  }

  public updateCustomer(customer: ICustomer): Observable<any> {
    return this.http.put(
      `${CUSTOMERS_API_URL}/${customer.id}`,
      JSON.stringify(customer),
      this.httpOptions
    ).pipe(
      map((res) => res),
      catchError((err) => throwError(err))
    );
  }

  public deleteCustomer(customer: ICustomer): Observable<any> {
    return this.http.delete(`${CUSTOMERS_API_URL}/${customer.id}`)
      .pipe(
        map((res) => res),
        catchError((err) => throwError(err))
      );
  }

  private buildHttpOptions(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response'
    };
  }
}
