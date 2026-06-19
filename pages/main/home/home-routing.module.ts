import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { PetsComponent } from 'src/app/shared/components/pets/pets.component';
import { DatosRComponent } from 'src/app/shared/components/datos-r/datos-r.component';
import { ConsejosComponent } from 'src/app/shared/components/consejos/consejos.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      // Elimina la redirección a 'home' para evitar el ciclo infinito
      {
        path: 'pets',
        component: PetsComponent
      },
      {
        path: 'datosR',
        component: DatosRComponent
      },
      {
        path: 'consejos',
        component: ConsejosComponent
      }
    ]
  }
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
