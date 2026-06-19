import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';  // Importa el Router
@Component({
  selector: 'app-recupera-contrasenia',
  templateUrl: './recupera-contrasenia.page.html',
  styleUrls: ['./recupera-contrasenia.page.scss'],
})
export class RecuperaContraseniaPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
  })

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService)
  router = inject(Router);
  ngOnInit() {
  }

 async submit(){
    if(this.form.valid){

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.sendRecoveryEmail(this.form.value.email).then(res =>{
        this.utilsSvc.presentToast({
          message:"correo enviado correctamente",
          duration:1500,
          color:'primary',
          position:'middle',
          icon:'mail-outline'
        });

        this.utilsSvc.routerLink('/auth');
        this.form.reset();



      }).catch(error=>{
        console.log(error);

        this.utilsSvc.presentToast({
          message:"email o contraseña incorrecta",
          duration:2500,
          color:'primary',
          position:'middle',
          icon:'alert-circle-outline'
        })

      }).finally(()=>{
        loading.dismiss();
      })
    }
  }
  goToAuth() {
    this.router.navigate(['/auth']);  // Utiliza el Router inyectado
  }
}

