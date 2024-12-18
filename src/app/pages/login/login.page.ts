import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonIcon, IonImg } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonImg, IonIcon, IonButton, IonContent, CommonModule, FormsModule]
})
export class LoginPage {
  private authService = inject(AuthService);
  private router = inject(Router);
  private utilitiesService = inject(UtilitiesService);


  async loginWithGoogle() {
    const isLoggedIn = await this.authService.signInWithGoogle();
    const isProfileComplete = await this.authService.checkProfileCompletion()

    if (isLoggedIn && !isProfileComplete) {
      this.utilitiesService.showLoading()
      this.router.navigate(['/profile-complete']);
    } else if (isLoggedIn && isProfileComplete) {
      this.utilitiesService.showLoading()
      this.router.navigate(['/home'])
    }
  }

}
