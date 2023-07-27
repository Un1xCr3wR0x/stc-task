import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { httpInter } from './core/interceptors/http/http.interceptor';
import { ErrorService } from './core/services/error-handler/error-handler.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpInter])),
    {
      provide: ErrorHandler,
      useClass: ErrorService,
    },
    provideAnimations(),
    MatSnackBar,
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(
      TranslateModule.forChild({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      })
    ),
  ],
};
