import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SliderComponent } from "src/app/components/slider/slider.component";
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.page.html',
  styleUrls: ['./car-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SliderComponent, HeaderComponent]
})
export class CarDetailsPage {

  constructor() { }


}