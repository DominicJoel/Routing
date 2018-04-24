import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';//Para llamar al servicio de guard

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent  }
    ])
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthService,
    AuthGuard//Cada vez que creamos un servicio debemos instanciarlo en el modulo
  ]
})
export class UserModule { }
