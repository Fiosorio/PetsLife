import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent {
  eventData = {
    title: '',
    location: '',
    description: '',
    date: '',
  };

  constructor(private modalCtrl: ModalController, private toastController: ToastController) {}

  // Cierra el modal sin guardar
  dismiss() {
    this.modalCtrl.dismiss();
  }

  // Envía los datos del evento al componente principal
  save() {
    if (this.eventData.title && this.eventData.date) {
      this.modalCtrl.dismiss(this.eventData);
    } else {
      this.presentToast('Por favor completa todos los campos obligatorios.');
    }
  }

  // Muestra un toast con el mensaje proporcionado
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, 
      position: 'bottom', 
      color: 'danger', 
    });
    toast.present();
  }
}
