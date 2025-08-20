import { Component, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
    MatProgressSpinner,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  // Injects
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Signals
  loading = signal(false);
  error = signal<string | null>(null);
  hidePassword = signal(true);

  // Form reactive
  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  private sub?: Subscription;

  /**
   * Se ejecuta al enviar el formulario
   */
  onSubmit() {
    if (this.form.invalid) return;

    const { username, password } = this.form.value;
    this.loading.set(true);
    this.error.set(null);

    this.sub = this.authService.login(username!, password!).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.message);
        this.form.reset();
      },
    });
  }

  /**
   * NgOnDestroy: liberamos la subscripción
   */
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
