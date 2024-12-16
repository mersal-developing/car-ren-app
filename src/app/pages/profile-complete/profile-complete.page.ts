import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { IonItem, IonLabel, IonButton, IonInput } from "@ionic/angular/standalone";

@Component({
  selector: 'app-profile-complete',
  templateUrl: './profile-complete.page.html',
  styleUrls: ['./profile-complete.page.scss'],
  standalone: true,
  imports: [IonInput, IonButton, IonLabel, IonItem, ReactiveFormsModule]
})
export class ProfileCompletePage {
  private authService = inject(AuthService);
  private router = inject(Router)
  private fb = inject(FormBuilder);

  userForm!: FormGroup;

  constructor() {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
    })
  }


  async completeProfile() {
    console.log(this.userForm.value)
    // Validate the form
    if (this.userForm.invalid) {
      // TODO: Show error toast for invalid inputs
      console.error('Invalid form inputs:', this.userForm.errors);
      return;
    }

    // Extract form values
    const { username, phoneNumber } = this.userForm.value;

    try {
      const success = await this.authService.createProfile(username, phoneNumber);
      if (success) {
        await this.router.navigate(['/home']);
      } else {
        // TODO: Show error toast for update failure
        console.error('Profile update failed');
      }
    } catch (error) {
      // Handle error cases (e.g., network issues)
      console.error('Error during profile update:', error);
      // TODO: Show error toast
    }
  }
}
