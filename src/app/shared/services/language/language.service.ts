// Angular.
import { Injectable } from '@angular/core';

// Third-party.
import { TranslateService } from '@ngx-translate/core';

// App models.
import { ILanguage } from '../../models/language.model';

@Injectable({providedIn: 'root'})
export class LanguageService {

  constructor(private translate: TranslateService) {}

  public getCurrentLanguage(): string {
    return this.translate.currentLang;
  }

  public setCurrentLanguage(languageKey: string): void {
    const currentLang: string = this.getCurrentLanguage();

    if (languageKey !== currentLang) {
      this.translate.use(languageKey);
    }
  }

  public setLanguagesList(): ILanguage[] {
    return [
      {
        code: 'en-US',
        name: this.translate.instant('i18n.languages.enUS')
      },
      {
        code: 'pt-BR',
        name: this.translate.instant('i18n.languages.ptBR')
      },
    ];
  }
}
