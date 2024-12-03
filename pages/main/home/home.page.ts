import { Component, inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  router = inject(Router);
  currentSegment: string = 'home';
  ngOnInit() {
  }

  segmentChanged($event: any) {
    const direccion = $event.detail.value;
    if (direccion !== 'home') {
      this.router.navigate([`/main/home/${direccion}`]);
    }
  }
  

  signOut(){
    this.firebaseSvc.singOut();
  }


  isHomePage(): boolean {
    
    return this.router.url === '/main/home'; 
  }

}
