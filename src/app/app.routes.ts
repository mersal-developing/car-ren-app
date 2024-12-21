import { Router, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
    canActivate: [loginGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'profile-complete',
    loadComponent: () => import('./pages/profile-complete/profile-complete.page').then(m => m.ProfileCompletePage),
    canActivate: [async () => {
      const router = inject(Router);
      const authService = inject(AuthService)
      const isProfileComplete = await authService.checkProfileCompletion()
      if (isProfileComplete) {
        router.navigate(['/home']);
        return false;
      }
      else return true;
    }]
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
    canActivate: [authGuard]
  },
  {
    path: 'car-details',
    loadComponent: () => import('./pages/car-details/car-details.page').then(m => m.CarDetailsPage),
    canActivate: [authGuard]
  }
];
