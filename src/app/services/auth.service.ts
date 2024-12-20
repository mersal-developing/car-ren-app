import { inject, Injectable, signal } from '@angular/core';
import { PostgrestError, SupabaseClient, User, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { UtilitiesService } from './utilities.service';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { filter } from "rxjs";
import { Event, NavigationEnd, Router } from "@angular/router";
import { SocialLogin } from '@capgo/capacitor-social-login';
import { RoutingService } from './routing.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private utilitiesService = inject(UtilitiesService);
  private supabase: SupabaseClient;
  private routingService = inject(RoutingService);

  // Signals for reactive state management
  public user = signal<User | null>(null);

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
    this.routingService.routerNavigationEndObservable
      .pipe(
        takeUntilDestroyed(),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          event.url !== '/login' && this.setUser()
        }
      })
  }

  async setUser() {
    try {
      const { data, error } = await this.supabase.auth.getUser();
      if (error) console.log('Failed to set user', error)

      this.user.set(data.user);
    } catch (error) {
      this.utilitiesService.handleError('Failed to set user', error);
    }
  }

  isAuthenticated() {
    return this.supabase.auth.getSession()
  }

  async signInWithGoogle() {

    await SocialLogin.initialize({
      google: {
        webClientId: environment.webClientId
      },
    });

    const res = await SocialLogin.login({
      provider: 'google',
      options: {
        scopes: ['email', 'profile'],
      },
    });


    if (res.result.idToken) {
      this.utilitiesService.showLoading();
      const { data, error } = await this.supabase.auth.signInWithIdToken({
        provider: 'google',
        token: res.result.idToken
      })
      if (error) return false;
      else if (data) this.setUser();
    }


    return true;
  }

  async checkProfileCompletion(): Promise<boolean | PostgrestError> {

    await this.setUser();
    const user = this.user();
    if (!user) return false;

    const { data, error } = await this.supabase
      .from('profiles')
      .select('username, phone_number')
      .eq('id', user.id)
      .single();

    if (error) {
      console.log(error)
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
    this.routingService.navigateByUrl('/login');
    return true;
  }

}
