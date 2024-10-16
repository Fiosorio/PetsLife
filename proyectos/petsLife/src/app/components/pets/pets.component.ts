import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
})
export class PetsComponent    {

  constructor(private navcontroller: NavController) { }

 goToFormulario(){
  this.navcontroller.navigateForward('/formulario');
 }

}
