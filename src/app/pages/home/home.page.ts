import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  login: any = {};  // Inicializamos login como un objeto vacío.

  constructor(
    public alertControler: AlertController,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.login = this.router.getCurrentNavigation()?.extras.state?.['login'];
        console.log(this.login);
      }
    });
  }
  segmentChanged($event: any) {
    console.log($event);
    let direccion = $event.detail.value;
    this.router.navigate(['/home/' + direccion]);
  }

  alertaCerrarSesion() {
    this.presentAlert('Cerrar sesión', 'Sesión cerrada exitosamente');
  }

  async presentAlert(msgHeader: string, msg: string) {
    const alert = await this.alertControler.create({
      header: msgHeader,
      message: msg,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.router.navigate(['/inicio-sesion']);
          },
        },
      ],
    });
    await alert.present();
  }
}



