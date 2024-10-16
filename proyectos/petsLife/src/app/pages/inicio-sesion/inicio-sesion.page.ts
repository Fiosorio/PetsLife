import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular'; // Importar LoadingController

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  login: any = {
    usuario: '',
    password: '',
  };

  field: string = '';
  isLoading: boolean = false; // Variable para controlar el modal de carga

  constructor(public router: Router, public toastControler: ToastController, public loadingController: LoadingController) { } // Inyectar LoadingController

  ngOnInit() {
  }

  async Ingresar() {
    if (this.validateModel(this.login)) {
      this.isLoading = true; // Mostrar el modal de carga
      await this.presentLoading(); // Esperar el modal de carga

      this.presentToast('bottom', 'Bienvenid@ ' + this.login.usuario);
      let navigationExtras: NavigationExtras = {
        state: { login: this.login },
      };
      this.router.navigate(['/home'], navigationExtras);
    } else {
      this.presentToast('middle', 'falta el campo ' + this.field, 3000);
    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', msg: string, duration?: number) {
    const toast = await this.toastControler.create({
      message: msg,
      duration: duration ? duration : 2000,
      position: position
    });
    await toast.present();
  }

  validateModel(model: any) {
    for (var [key, value] of Object.entries(model)) {
      if (value == '') {
        this.field = key;
        return false;
      }
    }
    return true;
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      spinner: 'crescent', // Puedes cambiar el tipo de spinner si quieres
      duration: 2000 // Duración de la pantalla de carga
    });
    await loading.present();
    await loading.onDidDismiss(); // Esperar a que se cierre el loading
    this.isLoading = false; // Ocultar modal de carga
  }
}
