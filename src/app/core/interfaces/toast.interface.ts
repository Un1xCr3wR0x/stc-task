import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { ToastType } from "../enums/toast-type.enum";
export interface Toast {
    message:string,
    discard?:string,
    horizontalPosition?:MatSnackBarHorizontalPosition,
    verticalPosition?: MatSnackBarVerticalPosition,
    type:ToastType
}