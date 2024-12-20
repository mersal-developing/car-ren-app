import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from "src/app/components/slider/slider.component";
import {
  IonContent,
  IonToolbar,
  IonBadge,
  IonBackButton,
  IonText,
  IonButtons,
  IonItem,
  IonLabel,
  IonNote,
  IonButton,
  IonIcon
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.page.html',
  styleUrls: ['./car-details.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonNote,
    IonLabel,
    IonItem,
    IonButtons,
    IonText,
    IonBackButton,
    IonBadge,
    IonToolbar,
    IonContent,
    CommonModule,
    FormsModule,
    SliderComponent
  ]
})
export class CarDetailsPage {

  constructor() { }


}
