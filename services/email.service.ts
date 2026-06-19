import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { EmailJSResponseStatus } from '@emailjs/browser';
import { User } from 'src/app/models/user.model';  // Asegúrate de importar el modelo User

@Injectable({
  providedIn: 'root',
})
export class EmailService {

  private template = 'template_uko2iue';  // Reemplaza con tu Template ID
  private service = 'service_0xzbj2k';  // Reemplaza con tu Service ID
  private publicId = 'JozlBZ6QXVLGlwVNV';  // Reemplaza con tu Public Key

  constructor() { }

  sendEmail(user: User): Promise<EmailJSResponseStatus> {
    const templateParams = {
      user_name: user.name,  // Nombre del usuario desde el modelo
      user_email: user.email,  // Email del usuario desde el modelo
      to_email: user.email   // Correo al que se enviará el email (usuario registrado)
    };
  
    // Enviar el correo con EmailJS
    return emailjs.send(this.service, this.template, templateParams, this.publicId);
  }
}
