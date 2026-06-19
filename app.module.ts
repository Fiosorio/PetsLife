import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'; 
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';

// Importa Calendar
import { Calendar } from '@awesome-cordova-plugins/calendar/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Calendar  // Agrega Calendar como proveedor aquí
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

