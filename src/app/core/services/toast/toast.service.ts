import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ToastType } from '../../enums/toast-type.enum';
import { Toast } from '../../interfaces/toast.interface';
import { ToastPosition } from '../../enums/toast-position.enum';
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private _snackBar: MatSnackBar) {}

  /**
  |--------------------------------------------------
  | handling the toat opening 
  | takes an input of type Toast interface and start 
  | to use this data sent in the input data to confi-
  | ure the toast
  |--------------------------------------------------
  */
  openToast(data: Toast) {
    this._snackBar.open(data.message, data.discard ?? '', {
      horizontalPosition: ToastPosition.End,
      verticalPosition: ToastPosition.Top,
      panelClass: data.type ? data.type : ToastType.Success,
      duration: 4000,
    });
  }
}
