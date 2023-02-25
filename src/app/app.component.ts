// Angular.
import { Component } from '@angular/core';

// App environment.
import { environment } from '@env/environment';

// App services.
import { LanguageService } from '@shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private languageService: LanguageService) {
    this.setLanguage();
  }

  private setLanguage(): void {
    const currentLanguage: string = localStorage.getItem(environment.localStorage.language) || null;

    this.languageService.setCurrentLanguage(currentLanguage, true);
  }
}
