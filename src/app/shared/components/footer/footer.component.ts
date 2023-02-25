// Angular.
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

// Third-party.
import { TranslateService } from '@ngx-translate/core';

// App models.
import { ILanguage } from '@shared/models/language.model';

// App services.
import { LanguageService } from '@shared/services/language/language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public formLanguages = new FormControl('');
  public languagesList: ILanguage[] = this.languageService.setLanguagesList();

  constructor(
    protected languageService: LanguageService,
    protected translate: TranslateService
  ) {}

  public ngOnInit(): void {
    const currentLanguage: string = this.languageService.getCurrentLanguage();
    this.formLanguages.setValue(currentLanguage);

    this.listenToLanguageChanges();
  }

  private listenToLanguageChanges(): void {
    this.formLanguages.valueChanges.subscribe(newLanguage => this.languageService.setCurrentLanguage(newLanguage));
  }
}
