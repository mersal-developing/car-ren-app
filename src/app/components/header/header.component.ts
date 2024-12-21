import { Component, inject, OnInit, signal } from '@angular/core';
import { IonHeader, IonIcon, IonButtons, IonToolbar, IonTitle, IonImg } from "@ionic/angular/standalone";
import { User } from '@supabase/supabase-js';
import { SearchComponent } from "src/app/components/search/search.component";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonImg, IonTitle, IonToolbar, IonButtons, IonIcon, IonHeader, SearchComponent]
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);

  user: User | null = this.authService.user();
  userAvatar = signal('');


  ngOnInit() {
    this.userAvatar.set(this.user?.user_metadata['avatar_url']);
  }
}
