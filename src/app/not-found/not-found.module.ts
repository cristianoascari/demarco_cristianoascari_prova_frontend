import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Third-party.
import { TranslateModule } from '@ngx-translate/core';

// App routers.
import { NotFoundRoutingModule } from '@app/not-found/not-found-routing.module';

// App components.
import { NotFoundComponent } from './not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    TranslateModule,

    NotFoundRoutingModule
  ]
})
export class NotFoundModule {}
