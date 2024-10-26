import { Component, inject, OnInit } from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdatePetsComponent } from '../add-update-pets/add-update-pets.component';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
})
export class PetsComponent implements OnInit {
  router = inject(Router);
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {}

  isPetsPage(): boolean {
    return this.router.url === '/main/home/pets'; // Asegúrate de que esto coincida con tu ruta
  }

  // Método para navegar a Home
  goToHome() {
    this.router.navigate(['/main/home']); // Cambia la ruta según tu configuración
  }

  addUpdatePet() {
    this.utilsSvc.presentModal({
      component: AddUpdatePetsComponent,
      cssClass:'add-update-modal'
    });
  }
}
