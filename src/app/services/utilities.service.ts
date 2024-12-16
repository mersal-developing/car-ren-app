import { Injectable, inject } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  private toastController = inject(ToastController);

  constructor() { }

  async presentToast(message: string, position: 'top' | 'middle' | 'bottom' = 'top',) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: position,
      color: 'medium'
    });

    await toast.present();
  }
}
