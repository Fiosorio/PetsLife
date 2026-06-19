import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  
  firebaseSvc=inject(FirebaseService);
  utilsSvc=inject(UtilsService);

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
   

    return new Promise((resolve)=>{


      this.firebaseSvc.getAuth().onAuthStateChanged((auth)=>{
        if(!auth)  resolve(true)

      else{
        this.utilsSvc.routerLink('/main/home/pets')
        resolve(false);
      }
      })
    });
  }
}