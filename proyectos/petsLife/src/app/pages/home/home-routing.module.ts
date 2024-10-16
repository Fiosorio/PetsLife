import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { PetsComponent } from 'src/app/components/pets/pets.component';
import { IdeasComponent } from 'src/app/components/ideas/ideas.component';
import { ConfigComponent } from 'src/app/components/config/config.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path:'pets', component:PetsComponent
      },
      {
        path:'ideas',component:IdeasComponent
      },
      {
        path:'config',component:ConfigComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
