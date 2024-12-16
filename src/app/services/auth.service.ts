import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseClient, User, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
    const user = await this.supabase.auth.getUser()
    this.user.set(user.data.user);
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
      return false;
    }

    this.setUser()
    return true;
  }

  async checkProfileCompletion() {
    const user = this.user();
    if (!user) return false;

    try {
      const { data, error } = await this.supabase
        .from('profiles')
        .select('username, phone_number')
        .eq('id', user.id)
        .single();

      if (error) return false;

      // Return true if both username and phone_number exist
      return !!(data?.username && data?.phone_number);
    } catch (err) {
      console.error('Profile Check Error:', err);
      return false;
    }
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

    try {
      const insertData = await this.supabase
        .from('profiles')
        .insert(profileData)
        .select();


      console.log('Profile created successfully:', insertData);
      return true;
    } catch (error) {
      console.error('Profile Update/Insert Error:', error);
      return false;
    }
  }

  async signOut() {
    try {
      // Supabase sign out
      const { error } = await this.supabase.auth.signOut();

      // If there's an error during sign out
      if (error) {
        console.error('Sign Out Error:', error.message);
        return false;
      }

      this.router.navigate(['/login']);

      return true;
    } catch (err) {
      console.error('Unexpected Sign Out Error:', err);
      return false;
    }
  }


}
