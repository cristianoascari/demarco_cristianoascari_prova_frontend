// Angular.
import { Injectable } from '@angular/core';

// Third-party.
import { TranslateService } from '@ngx-translate/core';

// App environment.
import { environment } from '@env/environment';

// App models.
import { ILanguage } from '@shared/models';

@Injectable({providedIn: 'root'})
export class LanguageService {

  constructor(private translate: TranslateService) {}

  public getCurrentLanguage(): string {
    return this.translate.currentLang;
  }

  public setCurrentLanguage(languageKey: string, setAsDefaultLanguage: boolean = false): void {
    languageKey = languageKey || environment.defaultLanguage;

    this.translate.use(languageKey);

    localStorage.setItem(environment.localStorage.language, languageKey);

    if (setAsDefaultLanguage) {
      this.setDefaultLanguage(languageKey);
    }
  }

  private setDefaultLanguage(languageKey): void {
    this.translate.setDefaultLang(languageKey);
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
