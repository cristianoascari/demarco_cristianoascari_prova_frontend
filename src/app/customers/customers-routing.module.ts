// Angular.
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// App components.
import { CustomersComponent } from '@app/customers/customers.component';
import { CustomersFormComponent } from '@app/customers/customers-form/customers-form.component';

// Routes.
const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'edit-customer/:id',
    component: CustomersFormComponent
  },
  {
    path: 'new-customer',
    component: CustomersFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule {}
