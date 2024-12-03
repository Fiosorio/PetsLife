import { Component, OnInit, Input } from '@angular/core';
import { inject, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { PetService } from 'src/app/services/petsapi.service';
import { ModalController } from '@ionic/angular';
import { CalendariomodalComponent } from '../calendariomodal/calendariomodal.component';
import { pets } from 'src/app/models/pets.model';
@Component({
  selector: 'app-add-update-pets',
  templateUrl: './add-update-pets.component.html',
  styleUrls: ['./add-update-pets.component.scss'],
})
export class AddUpdatePetsComponent implements OnInit {
  
  @Input() pet:pets
  
  
  
  form = new FormGroup({
    idP: new FormControl(''),
    image: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    peso: new FormControl(null, [Validators.required, Validators.min(0)]),
    pesoUnidad: new FormControl('', [Validators.required]),
    birthDate: new FormControl(null, [Validators.required]),
    specie: new FormControl('', [Validators.required]),
    raza: new FormControl('', [Validators.required]),
    sexo: new FormControl('', [Validators.required]),
  });

  catBreeds: any[] = [];
  dogBreeds: any[] = [];

  router = inject(Router);
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  petService = inject(PetService);
  modalController = inject(ModalController);

  user = {} as User;

  ngOnInit() {
    this.loadBreeds();
    this.user = this.utilsSvc.getFromLocalStorage('user');
    if (this.pet) this.form.setValue(this.pet);

  }

  async takeImage() {
    const dataUrl = (await this.utilsSvc.takePicture('imagen de la mascota'))
      .dataUrl;
    this.form.controls.image.setValue(dataUrl);
  }

  loadBreeds() {
    this.petService.getCatBreeds().subscribe((breeds) => {
      this.catBreeds = breeds;
    });
    this.petService.getDogBreeds().subscribe((breeds) => {
      this.dogBreeds = breeds;
    });
  }


submit(){
  if (this.form.valid) {

    if(this.pet) this.updatePet();
    else this.createPet()

  }
}




  async createPet() {
    
      let path = `users/${this.user.uid}/pets`;

      const loading = await this.utilsSvc.loading();
      await loading.present();

      let dataUrl = this.form.value.image;
      let imagePath = `${this.user.uid}/${Date.now()}`;
      let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
      this.form.controls.image.setValue(imageUrl);

      delete this.form.value.idP;
      this.utilsSvc.dismissModal({success:true });
      
      this.utilsSvc.presentToast({
        message: 'mascota agregada correctamente',
        duration: 1500,
        color: 'success',
        position: 'middle',
        icon: 'checkmark-circle-outline',
      });

      this.firebaseSvc
        .addDocument(path,this.form.value)
        .then(async (res) => {
        })
        .catch((error) => {
          console.log(error);
          this.utilsSvc.presentToast({
            message: 'email o contraseña incorrecta',
            duration: 2500,
            color: 'primary',
            position: 'middle',
            icon: 'alert-circle-outline',
          });
        })
        .finally(() => {
          loading.dismiss();
        });
    }
  

  async updatePet() {
    
      let path = `users/${this.user.uid}/pets/${this.pet.idP}`;

      const loading = await this.utilsSvc.loading();
      await loading.present();


      if(this.form.value.image!==this.pet.image){
        let dataUrl = this.form.value.image;
        let imagePath = await this.firebaseSvc.getFilePath(this.pet.image)
        let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
        this.form.controls.image.setValue(imageUrl);
      }

      delete this.form.value.idP
      this.firebaseSvc.updateDocument(path,this.form.value).then(async (res) => {
      
        this.utilsSvc.dismissModal({success:true });
      
        this.utilsSvc.presentToast({
        message: 'mascota modificada correctamente',
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








  onSpecieChange(event: any) {
    const selectedSpecie = event.detail.value;
    this.form.controls.raza.reset(); 
  }

  async openCalendarModal() {
    const modal = await this.modalController.create({
      component: CalendariomodalComponent,
      cssClass: 'small-modal', 
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      
      const date = new Date(data);
      const formattedDate = date.toISOString().split('T')[0]; 
      this.form.controls.birthDate.setValue(formattedDate); 
    }
  }

  onSexoChange(event: any) {
    this.form.controls.sexo.setValue(event.detail.value); 
  }
}
