import { Component } from '@angular/core';
import { IonHeader, IonIcon, IonButtons, IonToolbar, IonTitle, IonProgressBar } from "@ionic/angular/standalone";
import { SearchComponent } from "src/app/components/search/search.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonProgressBar, IonTitle, IonToolbar, IonButtons, IonIcon, IonHeader, SearchComponent]
})
export class HeaderComponent {

  constructor() { }


}
