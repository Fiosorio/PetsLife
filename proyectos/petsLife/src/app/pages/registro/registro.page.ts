import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(public alertControler:AlertController,
    private router:Router
  ) { }
  registroAlerta(){
    this.presentAlert('Registro exitoso','Te has registrado correctamente');
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
