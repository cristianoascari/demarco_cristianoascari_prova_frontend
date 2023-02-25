// Angular.
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// App components.
import { NotFoundComponent } from '@app/not-found/not-found.component';

// Routes.
const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotFoundRoutingModule {}
