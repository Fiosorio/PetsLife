import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  //declaracion del modelo del login
  login: any={
    usuario:'',
    password:'',
  }

  field:string='';  
  constructor(public router:Router, public toastControler:ToastController) { }

  ngOnInit() {
  }
  Ingresar(){
    if (this.validateModel(this.login)){
      this.presentToast('bottom','Bienvenid@ '+this.login.usuario);
      let navigationExtras:NavigationExtras={
        state:{login:this.login},
      }
      this.router.navigate(['/home'],navigationExtras);
    }else{
      this.presentToast('middle','falta el campo '+this.field,3000);
    }
  }

  async presentToast(position:'top'|'middle'|'bottom',msg:string,duration?:number){
    const toast=await this.toastControler.create({
      message:msg,
      duration: duration ? duration:2000,
      position:position

    });
    await toast.present();
  }
  validateModel(model:any){
    for(var[key,value]of Object.entries(model)){
      if(value==''){
        this.field = key;
        return false;
      }
    }
    return true;
  }
}
