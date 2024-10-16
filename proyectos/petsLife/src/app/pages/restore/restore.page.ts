import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-restore',
  templateUrl: './restore.page.html',
  styleUrls: ['./restore.page.scss'],
})
export class RestorePage implements OnInit {

  constructor(
    public alertControler:AlertController,
    private router:Router
  ) { }
  mostrarAlerta(){
    this.presentAlert('Correo enviado','se ha enviado un correo para restablecer tu contraseña');
  }
  async presentAlert(msgHeader:string,msg:string){
    const alert = await this.alertControler.create({
      header:msgHeader,
      message:msg,
      buttons:[{
        text:'Ok',
        handler:()=>{
          this.router.navigate(['/inicio-sesion']);

        }
      }]
    });
    await alert.present();
  }

  ngOnInit() {
  }

}
