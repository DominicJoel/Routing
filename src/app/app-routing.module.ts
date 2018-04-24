import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';

import { AuthGuard } from "./user/auth-guard.service";
import { SelectiveStrategy } from "./selective-strategy.service";


@NgModule({
         imports: [
            RouterModule.forRoot([
                { path: 'welcome', component: WelcomeComponent },//Esto nos mueve al componente "Welcome Component" , cuando usamos el nombre del path "welcome"
                {
                   path: 'products',
                   canActivate: [AuthGuard],
                   data:{ preload: false },//Para que precargue la data, solo aplica en producto porque fua al unico que le hicimos el lazy Loading, y por aqui controlamos si queremos que se precarguen (true) o no (false)
                   loadChildren: 'app/products/product.module#ProductModule',//Para que funcione el lazy Loading ( loadChildren: 'app/products/product.module#ProductModule' ) Le indicamos la Url donde se encuentran los archivos usamos el hash(#) y le ponemos el nombre de la clase del modulo y el canLoad es para que no cargue todo hasta que no entre
                   
                  },
                { path : '', redirectTo: 'welcome', pathMatch: 'full' },//Si no especificamos una ruta nos redireciona al path del ' welcome ' 
                { path: '**', component: PageNotFoundComponent }//Nos manda a ese componente en caso de que no coincida con nada
             ], 
              {enableTracing: true, preloadingStrategy:SelectiveStrategy})//El enable tracing es para ver los eventos del Router, seguimiento de lPara ver el proceso de routing y el ( preloadingStrategy ) le indicamos que precarguen los modulos
         ],
         providers:[ SelectiveStrategy ],
       exports:[ RouterModule ]
})

export class AppRoutingModule{

}