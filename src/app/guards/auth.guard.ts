import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const authSession = await authService.isAuthenticated()
  const isAuthenticated = authSession.data.session;

  let isProfileComplete;
  if (isAuthenticated) {
    isProfileComplete = await authService.checkProfileCompletion()
  }

  if (isAuthenticated && isProfileComplete) {
    return true;
  } else if (!isAuthenticated && !isProfileComplete) {
    router.navigate(['/login']);
    return false;
  } else {
    router.navigate(['/profile-complete']);
    return false;  // Prevent access to the login page
  }



};
