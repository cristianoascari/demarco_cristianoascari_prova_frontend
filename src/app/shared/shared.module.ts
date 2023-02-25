// Angular.
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Third-party.
import { TranslateModule } from '@ngx-translate/core';

// Angular Material.
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

// App components.
import { FooterComponent } from '@shared/components/footer/footer.component';
import { HeaderComponent } from '@shared/components/header/header.component';

// App pipes.
import { FormatCurrencyPipe } from '@shared/pipes';

@NgModule({
  declarations: [
    FooterComponent,
    FormatCurrencyPipe,
    HeaderComponent
  ],
  exports: [
    TranslateModule,

    FooterComponent,
    FormatCurrencyPipe,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    TranslateModule,

    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  providers: [FormatCurrencyPipe]
})
export class SharedModule { }
