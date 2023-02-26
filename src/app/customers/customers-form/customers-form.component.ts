// Angular.
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// App models.
import { ICustomer } from '@app/shared';

// App directives.
import { InputFocusDirective } from '@app/shared';

// App services.
import { CustomerService } from '@app/shared';

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.scss']
})
export class CustomersFormComponent implements OnInit {
  public customerId: number;
  public customer: ICustomer;

  public formGroup: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.subscribeToRouterParamsChanges();
  }

  ngOnInit() {
    setTimeout(() => {
      this.createForm();
    }, 1500);
  }

  private subscribeToRouterParamsChanges(): void {
    this.activatedRoute.paramMap.subscribe( paramMap => {
      const paramID: string = paramMap.get('id');

      if (paramID) {
        this.customerId = Number(paramID);

        this.getCustomer();
      }
    });
  }

  private getCustomer(): void {
    if (this.customerId) {
      this.customerService.getCustomerById(this.customerId).subscribe(res => {
        this.customer = res as ICustomer;
      });
    }
  }

  public saveCustomer(): void {}

  private startCreatingNewCustomer(): void {
    this.customer = this.buildNewCustomer();

    this.formGroup.reset();
  }

  private createForm(): void {
    if (!this.customer) {
      this.customer = this.buildNewCustomer();
    }

    this.formGroup = this.formBuilder.group({
      age: [this.customer.age, [Validators.required]],
      city: [this.customer.city, [Validators.required]],
      id: [{value: this.customer.id, disabled: true}],
      name: [this.customer.name, [Validators.required]]
    });
  }

  private buildNewCustomer(): ICustomer {
    return {
      age: null,
      city: null,
      id: null,
      name: null
    };
  }

  public goHome(): void {
    this.router.navigate(['']);
  }
}
