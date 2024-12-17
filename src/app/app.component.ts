import { Component, inject, signal } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { HeaderComponent } from "./components/header/header.component";
import { Event, NavigationEnd, Router } from "@angular/router";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, HeaderComponent],
})
export class AppComponent {
  router = inject(Router);
  isAuthenticated = signal(false);

  constructor() {
    this.handleShowHeader()
  }

  async handleShowHeader() {
    this.router.events
      .pipe(
        takeUntilDestroyed(),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          if (event.urlAfterRedirects !== '/login' && event.urlAfterRedirects !== '/profile-complete') {
            this.isAuthenticated.set(true)
          }
        }
      })
  }
}
