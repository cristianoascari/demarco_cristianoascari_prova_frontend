// Angular.
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// App guards.
import { AuthGuard } from '@shared/guards';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@app/customers/customers.module').then(m => m.CustomersModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    loadChildren: () => import('@app/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
