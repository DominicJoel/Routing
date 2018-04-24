import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

//Router Module
import { RouterModule } from '@angular/router';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './products/product-data';

//Rutas
import {AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';

/* Feature Modules */
//import { ProductModule } from './products/product.module';//Lo borramos para que no descargue todos los componentes del modulo
import { UserModule } from './user/user.module';
import { MessageModule } from './messages/message.module';

@NgModule({
  imports: [
    BrowserModule,//Este es para agarrar funciones como (ngFor, ngIf)
    HttpModule,//Para agarrar las api y todo lo que tenga que ver con datos externos
    InMemoryWebApiModule.forRoot(ProductData, { delay: 1000 }),//Esto es para simular servicios de llamadas de back-end
  //  ProductModule, //Lo borramos para que no descargue todos los componentes del modulo
    UserModule,
    MessageModule,
    AppRoutingModule//Debe estar al final para que funcione
  ],
 
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
