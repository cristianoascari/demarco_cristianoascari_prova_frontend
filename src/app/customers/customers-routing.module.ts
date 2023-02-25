// Angular.
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// App components.
import { CustomersComponent } from '@app/customers/customers.component';

// Routes.
const routes: Routes = [
  {
    path: '',
    component: CustomersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule {}
