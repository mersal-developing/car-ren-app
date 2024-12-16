import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const authSession = await authService.isAuthenticated()
  const isAuthenticated = authSession.data.session;

  if (isAuthenticated) {
    router.navigate(['/home']);
    return false;  // Prevent access to the login page
  }

  return true;  // Allow access to the login page
};
