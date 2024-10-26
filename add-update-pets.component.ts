import { Component, inject, OnInit,Input } from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { PetService } from 'src/app/services/petsapi.service';
@Component({
  selector: 'app-add-update-pets',
  templateUrl: './add-update-pets.component.html',
  styleUrls: ['./add-update-pets.component.scss'],
})
export class AddUpdatePetsComponent  implements OnInit {
  form = new FormGroup({
    idP: new FormControl(''),
    image: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    peso: new FormControl('', [Validators.required, Validators.min(0)]),
    birthDate: new FormControl('', [Validators.required]),
    specie: new FormControl('', [Validators.required]),
    raza: new FormControl('', [Validators.required]),
    sexo: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    reminderDate: new FormControl('', [Validators.required]),
    reminderMessage: new FormControl('', [Validators.required])
  });

  catBreeds: any[] = [];
  dogBreeds: any[] = [];
  
  
  router=inject(Router);
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  petService = inject(PetService);

  ngOnInit() {
    this.loadBreeds();
  }

  loadBreeds() {
    this.petService.getCatBreeds().subscribe(breeds => {
      this.catBreeds = breeds;
    });
    this.petService.getDogBreeds().subscribe(breeds => {
      this.dogBreeds = breeds;
    });
  }


  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.signUp(this.form.value as User).then(async res => {
        await this.firebaseSvc.updateUser(this.form.value.name);
        let uid = res.user.uid;
      }).catch(error => {
        console.log(error);
        this.utilsSvc.presentToast({
          message: "email o contraseña incorrecta",
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        });
      }).finally(() => {
        loading.dismiss();
      });
    }
  }

  onSpecieChange(event: any) {
    const selectedSpecie = event.detail.value;
    this.form.controls.raza.reset(); // Limpiar la selección de raza
  }



  




 

}
