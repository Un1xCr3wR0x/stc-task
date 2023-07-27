import { Injectable,signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  /**
  |--------------------------------------------------
  | signal to store the loading status of the whole app
  |--------------------------------------------------
  */
  isLoading = signal(false);
}
