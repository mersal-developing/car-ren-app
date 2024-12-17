import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SliderComponent } from "../slider/slider.component";

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss'],
  standalone: true,
  imports: [IonicModule, SliderComponent]
})
export class CarCardComponent {

  constructor() { }


}
