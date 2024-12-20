import { Component, inject } from '@angular/core';
import { SliderComponent } from "../slider/slider.component";
import { Router } from '@angular/router';
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonText,
  IonBadge,
  IonCardTitle,
  IonIcon,
  IonCardContent,
  IonFooter,
  IonButton
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonFooter,
    IonCardContent,
    IonIcon,
    IonCardTitle,
    IonBadge,
    IonText,
    IonCardSubtitle,
    IonCardHeader,
    IonCard,
    SliderComponent
  ]
})
export class CarCardComponent {
  private router = inject(Router);

  constructor() { }


  navigateToCarPage() {
    this.router.navigate(['/car-details'])
  }

}
