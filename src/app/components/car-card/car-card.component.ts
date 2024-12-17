import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SliderComponent } from "../slider/slider.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss'],
  standalone: true,
  imports: [IonicModule, SliderComponent]
})
export class CarCardComponent {
  private router = inject(Router);

  constructor() { }


  navigateToCarPage() {
    this.router.navigate(['/car-details'])
  }

}
