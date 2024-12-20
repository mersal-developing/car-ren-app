import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { CarCardComponent } from "src/app/components/car-card/car-card.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonContent, CarCardComponent],
})
export class HomePage {
  constructor() { }
}
