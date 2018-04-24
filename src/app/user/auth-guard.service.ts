//Este es para el canActivate para protejer la ruta del user
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanLoad ,Router, Route } from '@angular/router';

import { AuthService } from "./auth.service";


@Injectable()
export class AuthGuard implements CanActivate,CanLoad {

    constructor(private _authService:AuthService, 
                private router:Router  ){ }

  canActivate(route: ActivatedRouteSnapshot , state:RouterStateSnapshot): boolean {//Esto es lo que manejara nuestro guard

    return this.checkLoggedIn( state.url ); // El RouterStateSnapshot contiene la url completa, ya que el ActivatedRouteSnapshot la tiene sementada por eso no nos sirve en este caso 
  }

   canLoad( route:Route ):boolean{//El metodo canLoad es para que si no esta utenticado no le cargue los archivos
         
          return this.checkLoggedIn(route.path);
   }
    

   checkLoggedIn( url: string ): boolean {
       if(this._authService.isLoggedIn()){ //Chequea si el usuario esta Loggeado y devuelve un verdadero
           return true;
       }
       this._authService.redirectUrl = url;//Esto es para que al momento de logearse nos dirija a la pagina correcta, no a una en especifico
       this.router.navigate(['/login']);//De lo contrario nos redirreciona a la pagina principal y devuelve un falso
       return false;
   }

}