import { ChangeDetectorRef, Component,OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { LoadingService } from './core/services/loading/loading.service';
import { LocalizationService } from './core/services/localization/localization.service';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { Language } from './core/enums/language.enum';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,TranslateModule],
  providers: [LocalizationService,TranslateService,TranslateStore],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'angular-standalone-progressive';
  currentLang:string = Language.English;
  private destroySubject: Subject<void> = new Subject();
  constructor(
    public loadingService: LoadingService,
    private localizationService: LocalizationService,
    private cdr:ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.localizationService.init();
    this.loadingService.isLoading.mutate(v => this.cdr.detectChanges());
    this.localizationService.onLangChange().pipe(
      takeUntil(this.destroySubject)
    ).subscribe(currentLang => {
      this.currentLang = this.localizationService.getCurrentLang()
    })

    this.router.events.pipe(
      takeUntil(this.destroySubject)
    ).subscribe(res => {
      this.cdr.detectChanges()
    })
  }

  ngAfterViewInit() {
    this.cdr.detectChanges()
  }
 
  ngOnDestroy() {
        // clean up
        this.destroySubject.next()
  }
}
