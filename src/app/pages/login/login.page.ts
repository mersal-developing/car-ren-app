import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonIcon, IonImg } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonImg, IonIcon, IonButton, IonContent, CommonModule, FormsModule]
})
export class LoginPage {
  private authService = inject(AuthService);


  loginWithGoogle() {
    this.authService.signInWithGoogle();
  }

}
