// Angular.
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

// Third-party.
import { TranslateModule } from '@ngx-translate/core';

// Angular material.
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

// App routers.
import { CustomersRoutingModule } from '@app/customers/customers-routing.module';

// App components.
import { CustomersComponent } from '@app/customers/customers.component';
import { CustomerDataComponent } from './customer-data/customer-data.component';
import { CustomerDeleteComponent } from './customer-delete/customer-delete.component';

// App modules.
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    CustomersComponent,
    CustomerDataComponent,
    CustomerDeleteComponent
  ],
  entryComponents: [
    CustomerDataComponent,
    CustomerDeleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule,

    MatButtonModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,

    CustomersRoutingModule,
    SharedModule
  ]
})
export class CustomersModule { }
