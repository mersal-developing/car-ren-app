import { Injectable, inject } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  private toastController = inject(ToastController);

  constructor() { }

  async presentToast(
    message: string,
    position: 'top' | 'middle' | 'bottom' = 'top',
    color: 'success' | 'warning' | 'danger' | 'medium' = 'medium',
    duration: number = 1500
  ) {
    const toast = await this.toastController.create({
      message,
      duration,
      position,
      color
    });
    await toast.present();
  }


  handleError(message: string, error: any): void {

    const errorMessage = error?.message || JSON.stringify(error) || 'Unknown error';
    console.error(message, errorMessage);
    this.presentToast(`${message}: ${errorMessage}`, 'top', 'danger');
  }
}
