import { EventEmitter, Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Language } from '../../enums/language.enum';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  constructor(public translate: TranslateService) {}

  init() {
    let langs = Object.values(Language)
    this.translate.addLangs(langs);
    this.translate.setDefaultLang(Language.English);

    let oldLang = localStorage.getItem('language') ?? Language.English;
    this.selectLang(oldLang);

  }

  getLangs() {
    return this.translate.getLangs();
  }

  getCurrentLang() {
    return this.translate.currentLang;
  }

  selectLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

  onLangChange(): EventEmitter<LangChangeEvent> {
    return this.translate.onLangChange;
  }

    instant(key: string, interpolateParams?: Object): string {
      if (!key) return '';
      return this.translate.instant(key, interpolateParams);
    }
}
