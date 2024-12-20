import { Component, inject, signal, ViewChild } from '@angular/core';
import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';
import { HeaderComponent } from "./components/header/header.component";
import { Event, NavigationEnd } from "@angular/router";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { App } from '@capacitor/app';
import { RoutingService } from './services/routing.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, HeaderComponent],
})

export class AppComponent {
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet!: IonRouterOutlet;

  private platform = inject(Platform);
  private routingService = inject(RoutingService);
  isAuthenticated = signal(false);


  constructor() {
    this.handleShowHeader();
    this.handleBackButton();
  }

  async handleShowHeader() {
    this.routingService.routerNavigationEndObservable
      .pipe(
        takeUntilDestroyed(),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(async (event: Event) => {

        if (event instanceof NavigationEnd) {
          if (!event.urlAfterRedirects.includes('/login') && !event.urlAfterRedirects.includes('/profile-complete')) {
            this.isAuthenticated.set(true);
          }
        }
      })
  }

  handleBackButton() {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      console.log(this.routerOutlet)
      this.routerOutlet && !this.routerOutlet.canGoBack() && App.exitApp()

    });
  }
}
