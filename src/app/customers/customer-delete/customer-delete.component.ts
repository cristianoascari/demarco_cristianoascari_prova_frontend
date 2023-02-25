// Angular.
import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';

// Angular Material.
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// Third-party.
import { TranslateService } from '@ngx-translate/core';

// App models.
import { ICustomer } from '@app/shared';

// App services.
import { CustomerService } from '@app/shared';

@Component({
  selector: 'app-customer-delete',
  templateUrl: './customer-delete.component.html',
  styleUrls: ['./customer-delete.component.scss']
})
export class CustomerDeleteComponent {
  public customer: ICustomer = this.data.customer;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerService: CustomerService,
    private dialogRef: MatDialogRef<CustomerDeleteComponent>,
    protected translate: TranslateService
  ) {}

  public deleteCustomer(): void {
    this.customerService.deleteCustomer(this.customer).subscribe(res => {
      this.closeDialog();
    });
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
