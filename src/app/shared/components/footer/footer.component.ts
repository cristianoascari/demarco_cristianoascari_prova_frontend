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
  public currentLanguage: ILanguage;

  constructor(
    protected languageService: LanguageService,
    protected translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this.currentLanguage = this.languagesList.find(lang => lang.code === 'pt-BR');
    this.formLanguages.setValue(this.currentLanguage.code);

    this.listenToLanguageChanges();
  }

  private listenToLanguageChanges(): void {
    this.formLanguages.valueChanges.subscribe(newLanguage => this.languageService.setCurrentLanguage(newLanguage));
  }
}
