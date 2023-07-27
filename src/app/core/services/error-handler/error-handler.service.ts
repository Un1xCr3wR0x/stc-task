import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { ToastService } from '../toast/toast.service';
import { ToastType } from '../../enums/toast-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastService:ToastService,private zone: NgZone) {}

  /**
  |--------------------------------------------------
  | Error handler to catch the error and build it and
  | send it to the toast service to open an toast with
  | the giving error
  |--------------------------------------------------
  */
  handleError(error: HttpErrorResponse) {
    let errorMessage:string = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Message: ${error.message}`;
    }
    console.log(error)
    this.zone.run(() => {
      this.toastService.openToast({
        message: errorMessage,
        type: ToastType.Error,
      });
    });
  }
}
