import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { PetsComponent } from 'src/app/shared/components/pets/pets.component';
import { DatosRComponent } from 'src/app/shared/components/datos-r/datos-r.component';
import { ConsejosComponent } from 'src/app/shared/components/consejos/consejos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule
  ],
  declarations: [HomePage,PetsComponent,DatosRComponent,ConsejosComponent]
})
export class HomePageModule {}
