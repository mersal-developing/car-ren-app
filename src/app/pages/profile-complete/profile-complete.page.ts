import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { IonItem, IonLabel, IonButton, IonInput, IonText, IonContent } from "@ionic/angular/standalone";
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-profile-complete',
  templateUrl: './profile-complete.page.html',
  styleUrls: ['./profile-complete.page.scss'],
  standalone: true,
  imports: [IonContent, IonText, IonInput, IonButton, IonLabel, IonItem, ReactiveFormsModule]
})

export class ProfileCompletePage {
  private authService = inject(AuthService);
  private router = inject(Router);
  private utilitiesService = inject(UtilitiesService);

  private fb = inject(FormBuilder);

  userForm!: FormGroup;

  constructor() {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
    })
  }

  async completeProfile() {
    // Validate the form
    if (this.userForm.invalid) {
      console.error('Invalid form inputs:', this.userForm.errors);
      this.utilitiesService.presentToast('Please fill out the form correctly.', 'top', 'danger');

      return;
    }

    const isProfileComplete = await this.authService.checkProfileCompletion()

    if (isProfileComplete) {
      console.log('profile already completed')
      this.utilitiesService.presentToast('Profile already completed')
      this.router.navigate(['/home']);
      return
    }
    // Extract form values
    const { username, phoneNumber } = this.userForm.value;

    try {
      const success = await this.authService.createProfile(username, phoneNumber);
      if (success) {
        await this.router.navigate(['/home']);
      } else {
        console.error('Profile create failed');
        this.utilitiesService.presentToast('Profile creation failed.', 'top', 'danger');
      }
    } catch (error) {
      console.error('Error during profile creation:', error);
      this.utilitiesService.handleError('Error during profile creation', error);
    }
  }
}
