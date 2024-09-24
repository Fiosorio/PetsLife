import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { PetsComponent } from 'src/app/components/pets/pets.component';
import { IdeasComponent } from 'src/app/components/ideas/ideas.component';
import { ConfigComponent } from 'src/app/components/config/config.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage,PetsComponent,IdeasComponent,ConfigComponent]
})
export class HomePageModule {}
