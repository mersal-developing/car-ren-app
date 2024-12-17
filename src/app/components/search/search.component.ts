import { Component, OnInit } from '@angular/core';
import { IonSearchbar } from "@ionic/angular/standalone";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [IonSearchbar]
})
export class SearchComponent {

  constructor() { }


}
