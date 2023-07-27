import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LocalizationService } from 'src/app/core/services/localization/localization.service';
import { Language } from 'src/app/core/enums/language.enum';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule,TranslateModule],
  exportAs: 'HeaderComponent',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public authService:AuthService,private localizationService:LocalizationService) {}
  availableLangs = Language
  /**
   * Handle the app logout
   */
  logout():void {
    this.authService.logout()
  }

  /**
   * Handle language selection
   */
  selectLang(lang:string):void {
    this.localizationService.selectLang(lang)
  }


}
