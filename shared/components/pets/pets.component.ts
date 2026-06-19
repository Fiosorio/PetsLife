import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Calendar } from '@awesome-cordova-plugins/calendar/ngx';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdatePetsComponent } from '../add-update-pets/add-update-pets.component';
import { AddEventComponent } from '../../components/add-event/add-event.component';
import { User } from 'src/app/models/user.model';
import { pets } from 'src/app/models/pets.model';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
})
export class PetsComponent implements OnInit {
  router = inject(Router);
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  pets:pets[]=[];
  events = [];
  modalCtrl = inject(ModalController);
  calendar = inject(Calendar);
  selectedPetId: string='';

  ngOnInit() {}

  user():User{
    return this.utilsSvc.getFromLocalStorage('user');
  }
  ionViewWillEnter() {
    this.getPets();
  }

  getPets(){
    let path = `users/${this.user().uid}/pets`;
    

   let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.pets = res;
        sub.unsubscribe();
      }
    })
  
  } 

  isPetsPage(): boolean {
    return this.router.url === '/main/home/pets'; // Asegúrate de que esto coincida con tu ruta
  }

  
  goToHome() {
    this.router.navigate(['/main/home']); 
  }

async  addUpdatePet(pet?:pets) {
   let success = await  this.utilsSvc.presentModal({
      component: AddUpdatePetsComponent,
      cssClass:'add-update-modal',
      componentProps:{pet}
    
    
    })

    if(success) this.getPets();
  }

async confirmDeletePet(pet:pets) {
  this.utilsSvc.presentAlert({
    header: 'Eliminar mascota',
    message: '¿Quieres eliminar esta mascota?',
    mode:"md",
    buttons: [
      {
        text: 'Cancelar',
      }, {
        text: 'Eliminar',
        handler: () => {
          this.deletePet(pet)
        }
      }
    ]
  });
}



  async deletePet(pet:pets) {
    
    let path = `users/${this.user().uid}/pets/${pet.idP}`;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    let imagePath = await this.firebaseSvc.getFilePath(pet.image)
    await this.firebaseSvc.deleteFile(imagePath);
    this.firebaseSvc.deleteDocument(path).then(async (res) => {
    
      this.pets = this.pets.filter(p => p.idP !== pet.idP);

      this.utilsSvc.presentToast({
      message: 'mascota eliminada correctamente',
      duration: 1500,
      color: 'success',
      position: 'middle',
      icon: 'checkmark-circle-outline',
      })


  }).catch((error) => {
        console.log(error);
        this.utilsSvc.presentToast({
          message: 'email o contraseña incorrecta',
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline',
        })
      })
      .finally(() => {
        loading.dismiss();
      });
}
  // Abre el modal para añadir un evento
  async openAddEventModal() {
    const modal = await this.modalCtrl.create({
      component: AddEventComponent,
    });
    modal.onWillDismiss().then((data) => {
      if (data.data) {
        this.addEventToCalendar(data.data);
      }
    });
    return await modal.present();
  }

  // Crea un evento en el calendario y en Firebase
  addEventToCalendar(eventData) {
    this.calendar
      .createEvent(
        eventData.title,
        eventData.location,
        eventData.description,
        new Date(eventData.date),
        new Date(eventData.date)
      )
      .then(() => {
        console.log('Evento creado en el calendario');
        this.addEventToFirebase(eventData);
      });
  }

  // Guarda el evento en Firebase
  addEventToFirebase(eventData: any ) {
    const path = `users/${this.user().uid}/pets/${this.selectedPetId}/events`;
    this.firebaseSvc.addDocument(path, eventData).then(() => {
      console.log('Evento guardado en Firebase');
    });
  }


}
