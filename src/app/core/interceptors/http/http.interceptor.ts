import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../../services/loading/loading.service';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const httpInter: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService)
  loadingService.isLoading.set(true);
    return next(req).pipe(
      finalize(() => {
        loadingService.isLoading.set(false);
      })
    ) as Observable<HttpEvent<any>>;
};
