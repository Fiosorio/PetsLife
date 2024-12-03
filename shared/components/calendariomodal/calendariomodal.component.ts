import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-calendariomodal',
  templateUrl: './calendariomodal.component.html',
})
export class CalendariomodalComponent {
  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }

  onDateSelected(event: any) {
    const selectedDate = event.detail.value;
    this.modalController.dismiss(selectedDate); // Pasa la fecha seleccionada al cerrar
  }
}
