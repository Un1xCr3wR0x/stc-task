import { Component, OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LoadingService } from 'src/app/core/services/loading/loading.service';
import { first, Subject, takeUntil } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit,OnDestroy {
  loginForm: FormGroup;
  private destroySubject: Subject<void> = new Subject();
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public loadingService: LoadingService
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      if (this.authService.isAdmin()) {
        this.router.navigate(['store/dashboard']);
      } else {
        this.router.navigate(['store/products']);
      }
    }
    this.createReactiveFormGroup();
  }

  createReactiveFormGroup(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get getFormField() {
    return this.loginForm.controls;
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.authService
      .login(this.loginForm.value)
      .pipe(first())
      .pipe(takeUntil(this.destroySubject))
      .subscribe((user) => {
        this.router.navigate(['/']);
      });
  }

  ngOnDestroy() {
    // clean up
    this.destroySubject.next();
  }
}
