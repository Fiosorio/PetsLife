import { Injectable } from '@angular/core';
import { SQLite,SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform,ToastController } from '@ionic/angular';
import { BehaviorSubject,Observable } from 'rxjs';
import { Mascotas } from '../clases/mascotas';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  public database!:SQLiteObject;
  tblMascotas:string="CREATE TABLE IF NOT EXISTS mascotas(id INTEGER PRIMARY KEY AUTOINCREMENT,nombreM VARCHAR(50) NOT NULL, edadM INTEGER, especie VARCHAR(50),raza VARCHAR(50),sexo VARCHAR(10),peso REAL,fechaNacimiento TEXT,foto TEXT,vacunas TEXT, historialMedico TEXT,recordatorios TEXT);";
  listaMascotas = new BehaviorSubject<Mascotas[]>([]);
  private idDbReady:BehaviorSubject<boolean>=new BehaviorSubject(false);

  constructor(private sqlite:SQLite,
              private platform:Platform,
              public toastController:ToastController
  ) {this.crearBD(); }

  crearBD(){
    this.platform.ready().then(()=>{
      this.sqlite.create({
        name:'mascotas.db',
        location:'default'
      }).then((db:SQLiteObject)=>{
        this.database = db;
        this.presentToast("BD creada");
        this.crearTablas();
      }).catch(e => this.presentToast(e));
    })
  }  

  async crearTablas(){
    try{
      await this.database.executeSql(this.tblMascotas,[]);
      this.presentToast("Tabla creada");
      this.cargarMascotas();
      this.idDbReady.next(true);
    } catch(error){
      this.presentToast("Error en Crear tabla:"+ error);
    }
  }

  cargarMascotas() {
    let items: Mascotas[] = [];
    this.database.executeSql('SELECT * FROM mascotas', [])
      .then(res => {
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            items.push({
              idM: res.rows.item(i).idM,
              nombreM: res.rows.item(i).nombreM,
              edadM: res.rows.item(i).edadM,
              especie: res.rows.item(i).especie,
              raza: res.rows.item(i).raza,
              sexo: res.rows.item(i).sexo,
              peso: res.rows.item(i).peso,
              fechaNacimiento: res.rows.item(i).fechaNacimiento ? new Date(res.rows.item(i).fechaNacimiento) : undefined,
              foto:res.rows.items(i).foto,
              vacunas: JSON.parse(res.rows.item(i).vacunas || '[]'),
              historialMedico: JSON.parse(res.rows.item(i).historialMedico || '[]'),
              recordatorios: JSON.parse(res.rows.item(i).recordatorios || '[]')
            });
          }
        }
        // Actualiza la lista de mascotas aquí, dentro del bloque then
        this.listaMascotas.next(items);
      });
  }

  async addMascota(mascota:Mascotas){
    let data =[
      mascota.nombreM,
      mascota.edadM,
      mascota.especie,
      mascota.raza,
      mascota.sexo,
      mascota.peso,
      mascota.fechaNacimiento?.toISOString(),
      mascota.foto,
      JSON.stringify(mascota.vacunas),
      JSON.stringify(mascota.historialMedico),
      JSON.stringify(mascota.recordatorios)
    ];
    await this.database.executeSql('INSERT INTO mascotas(nombreM, edadM, especie, raza, sexo, peso, fechaNacimiento, foto, vacunas, historialMedico, recordatorios) VALUES(?,?,?,?,?,?,?,?,?,?,?)',data);
    this.cargarMascotas();
  }
  

  async updateMascota(nombreM:any, edadM:any,especie:any,raza:any,sexo:any,peso:any,fechaNacimiento:any,foto:any,vacunas:any,historialMedico:any,recordatorios:any,idM:any){
    let data = [
      nombreM,
      edadM,
      especie,
      raza,
      sexo,
      peso,
      fechaNacimiento?.toISOString(),
      foto,
      JSON.stringify(vacunas),
      JSON.stringify(historialMedico),
      JSON.stringify(recordatorios),
      idM
    ];
      await this.database.executeSql('UPDATE mascotas SET nombreM =?,edadM=?,especie=?,raza=?,sexo=?,peso=?,fechaNacimiento=?,foto=?,vacunas=?,historialmedico=?,recordatorios=? WHERE idM=?',data);
      this.cargarMascotas();
  }

  async deleteMascota(idM:any){
    await this.database.executeSql('DELETE FROM mascotas WHERE idM=?',[idM]);
    this.cargarMascotas();
  }

  dbState(){
    return this.idDbReady.asObservable();
  }

  fetchMascotas():Observable<Mascotas[]>{
    return this.listaMascotas.asObservable();
  }

  async presentToast(mensaje:string){
    const toast=await this.toastController.create({
      message:mensaje,
      duration:3000
    });
    toast.present();
  }










}
