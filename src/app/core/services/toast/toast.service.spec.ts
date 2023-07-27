import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[MatSnackBar]
    });
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
