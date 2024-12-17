import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PostgrestError, SupabaseClient, User, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private utilitiesService = inject(UtilitiesService);
  private supabase: SupabaseClient;

  // Signals for reactive state management
  public user = signal<User | null>(null);

  constructor(private router: Router) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    this.setUser()
  }

  async setUser() {
    try {
      const { data, error } = await this.supabase.auth.getUser();
      if (error) this.utilitiesService.handleError('Failed to set user', error);

      this.user.set(data.user);
    } catch (error) {
      this.utilitiesService.handleError('Failed to set user', error);
    }
  }

  isAuthenticated() {
    return this.supabase.auth.getSession()
  }

  async signInWithGoogle() {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    });

    if (error) {
      console.error('Google Sign-In Error:', error);
      this.utilitiesService.handleError('Google Sign-In Error:', error.message)

      return false;
    }

    this.setUser()
    return true;
  }

  async checkProfileCompletion(): Promise<boolean | PostgrestError> {

    const user = this.user();
    if (!user) return false;

    const { data, error } = await this.supabase
      .from('profiles')
      .select('username, phone_number')
      .eq('id', user.id)
      .single();

    if (error) {
      this.utilitiesService.handleError('Profile Check Error', error);
      return false;
    }

    return !!(data?.username && data?.phone_number);
  }

  async createProfile(username: string, phoneNumber: string) {
    // Get the current logged-in user
    const user = this.user();
    if (!user) {
      console.error('No user logged in');
      return false;
    }

    // Prepare the profile data
    const profileData = {
      id: user.id, // Use the Supabase user ID
      username,
      phone_number: phoneNumber,
      email: user.email
    };

    const { error } = await this.supabase.from('profiles').insert(profileData).select();


    if (error) {
      this.utilitiesService.handleError('Profile Creation Error', error);
      return false;
    }

    return true;
  }

  async signOut(): Promise<boolean> {
    const { error } = await this.supabase.auth.signOut();

    if (error) {
      this.utilitiesService.handleError('Sign Out Error', error);
      return false;
    }

    this.user.set(null);
    this.router.navigate(['/login']);
    return true;
  }

}
