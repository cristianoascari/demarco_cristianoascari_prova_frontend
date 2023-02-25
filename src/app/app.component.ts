// Angular.
import { Component } from '@angular/core';

// Third-party.
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private translate: TranslateService) {
    this.setLanguage();
  }

  private setLanguage(): void {
    this.translate.setDefaultLang('pt-BR');
    this.translate.use('pt-BR');
  }
}
