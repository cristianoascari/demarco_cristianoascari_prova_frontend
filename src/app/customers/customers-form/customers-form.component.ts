// Angular.
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Third-party.
import { TranslateService } from '@ngx-translate/core';

// Angular Material.
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private router: Router,
    private snackBar: MatSnackBar,
    private translate: TranslateService
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

  public saveCustomer(): void {
    if (this.formGroup.valid) {
      this.customer = {
        age: this.formGroup.get('age').value,
        city: this.formGroup.get('city').value,
        id: this.formGroup.get('id').value,
        name: this.formGroup.get('name').value,
      };

      if (this.customer.id) {
        this.editCustomer();
      } else {
        this.createCustomer();
      }
    }
  }

  private createCustomer(): void {
    this.customerService.createCustomer(this.customer).subscribe(res => {
      this.snackBar.open(this.translate.instant('messages.sucess.customerCreated'), 'OK', {duration: 3000});
      this.startCreatingNewCustomer();
    });
  }

  private editCustomer(): void {
    this.customerService.updateCustomer(this.customer).subscribe(res => {
      this.snackBar.open(this.translate.instant('messages.sucess.customerUpdated'), 'OK', {duration: 3000});
      this.goHome();
    });
  }

  private startCreatingNewCustomer(): void {
    // TO DO: Verificar pq o form não está sendo resetado de acordo.
    /*this.customer = this.buildNewCustomer();

    this.formGroup.reset();
    this.formGroup.markAsPristine();
    this.formGroup.markAsUntouched();
    this.formGroup.updateValueAndValidity();

    document.getElementById('name').focus();*/

    window.location.reload();
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
