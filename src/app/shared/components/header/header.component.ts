// Angular.
import { Component } from '@angular/core';

// Third-party.
import { TranslateService } from '@ngx-translate/core';

// Angular Material.
import { MatSnackBar } from '@angular/material/snack-bar';

// App services.
import { LanguageService } from '@shared/services/language/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    protected languageService: LanguageService,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  public viewUserProfile(): void {
    this.snackBar.open(this.translate.instant('messages.error.todo'), 'OK', {duration: 5000});
  }

  public logoutUser(): void {
    this.snackBar.open(this.translate.instant('messages.error.todo'), 'OK', {duration: 5000});
  }
}
