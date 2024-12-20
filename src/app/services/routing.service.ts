import { Injectable, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Event, NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject, Observable, filter } from "rxjs";

@Injectable({ providedIn: "root" })
export class RoutingService {
  router = inject(Router);

  private _currentLocation: BehaviorSubject<string> = new BehaviorSubject('');
  private _history: string[] = [];

  get history(): string[] {
    return this._history;
  }

  get backLink(): string {
    const previousPageIndex = this.history.length - 2;
    return this.history[previousPageIndex];
  }

  get routerNavigationEndObservable(): Observable<Event> {
    return this.router.events;
  }

  get currentLocation(): BehaviorSubject<string> {
    return this._currentLocation;
  }

  constructor() {
    this.routerNavigationEndObservable.
      pipe(
        takeUntilDestroyed(),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.history.push(event.url);
          this._currentLocation.next(event.urlAfterRedirects);
        }
      })
  }

  navigateBackClicked() {
    this.router.navigateByUrl(this.backLink);
  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }
}