import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { EmailService } from 'src/app/services/email.service'; // Servicio de Email

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  // Definición del formulario
  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]), // Validación de correo
    password: new FormControl('', [Validators.required]), // Validación de contraseña
    name: new FormControl('', [Validators.required, Validators.minLength(4)]), // Validación de nombre
  });

  // Servicios inyectados
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  emailSvc = inject(EmailService);
  router = inject(Router);

  ngOnInit() {}

  // Método para manejar el envío del formulario
  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      // Registra al usuario en Firebase
      this.firebaseSvc.signUp(this.form.value as User).then(async res => {
        const uid = res.user.uid;
        this.form.controls.uid.setValue(uid);

        // Actualiza el nombre del usuario en Firebase
        await this.firebaseSvc.updateUser(this.form.value.name);

        // Guarda la información del usuario en Firestore
        await this.setUserInfo(uid);

        // Crear un objeto de tipo User
        const user: User = {
          uid: uid,
          email: this.form.value.email,
          password: '', // No enviar la contraseña por correo
          name: this.form.value.name,
        };

        // Enviar correo de confirmación
        await this.emailSvc.sendEmail(user);
      }).catch(error => {
        // Maneja errores del registro
        console.log(error);
        this.utilsSvc.presentToast({
          message: 'Error en el registro',
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline',
        });
      }).finally(() => {
        // Finaliza el loading
        loading.dismiss();
      });
    }
  }

  // Método para guardar la información del usuario en Firestore
  async setUserInfo(uid: string) {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      const path = `users/${uid}`;
      const formData = { ...this.form.value };
      delete formData.password; // Elimina la contraseña antes de guardar

      // Guarda la información del usuario en Firestore
      this.firebaseSvc.setDocument(path, formData).then(async res => {
        // Guarda los datos del usuario en el localStorage
        this.utilsSvc.saveInLocaslStorage('user', formData);

        // Redirige al usuario a la página principal
        this.utilsSvc.routerLink('/main/home');
        this.form.reset();
      }).catch(error => {
        // Maneja errores al guardar los datos del usuario
        console.log(error);
        this.utilsSvc.presentToast({
          message: 'Error al registrar los datos del usuario',
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline',
        });
      }).finally(() => {
        // Finaliza el loading
        loading.dismiss();
      });
    }
  }

  // Método para redirigir a la página de autenticación
  goToAuth() {
    this.router.navigate(['/auth']);
  }
}
