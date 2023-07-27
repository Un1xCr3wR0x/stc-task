import { TestBed } from '@angular/core/testing';

import { ErrorService } from './error-handler.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('ErrorService', () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[MatSnackBar]
    });
    service = TestBed.inject(ErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
