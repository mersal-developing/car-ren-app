import { Component } from '@angular/core';
import { IonContent, IonText } from '@ionic/angular/standalone';
import { HeaderComponent } from "src/app/components/header/header.component";
import { CarCardComponent } from "src/app/components/car-card/car-card.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonText, IonContent, HeaderComponent, CarCardComponent],
})
export class HomePage {
  constructor() { }
}
