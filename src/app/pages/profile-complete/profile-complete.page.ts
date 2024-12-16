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
      // TODO: Show error toast for invalid inputs
      console.error('Invalid form inputs:', this.userForm.errors);
      return;
    }

    const isProfileComplete = await this.authService.checkProfileCompletion()

    if (isProfileComplete) {
      console.log('profile already completed')
      this.utilitiesService.presentToast('Profile already completed')
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
      }
    } catch (error) {
      // Handle error cases (e.g., network issues)
      console.error('Error during profile creation:', error);
      this.utilitiesService.presentToast(`'Error during profile update:', ${error}`)

    }
  }
}
