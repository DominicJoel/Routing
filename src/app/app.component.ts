import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd , NavigationError, NavigationCancel } from "@angular/router";//Agarramos los eventos del routing

import { AuthService } from './user/auth.service';

//services
import { MessageService } from './messages/message.service';

@Component({
    selector: 'pm-app',
    templateUrl: './app/app.component.html'
})
export class AppComponent {
    pageTitle: string = 'Acme Product Management';
    loadig: boolean = true;//Para usar un spinner al momento de cambiar de rutas

    constructor(private authService: AuthService,
                private router: Router,
                private _messageService : MessageService) {

                    router.events.subscribe( (routerEvent: Event) => {
                            this.checkTRouterEvent(routerEvent);
                    });
                 }
    
    checkTRouterEvent( routerEvent: Event ):void{
            if (routerEvent instanceof NavigationStart) { //Loading tomara el valor de verdadero si el Evento Comienza
                    this.loadig = true;
            } 
            if(routerEvent instanceof NavigationEnd ||//Loading tomara el valor de verdadero si el Evento falla
                routerEvent instanceof NavigationCancel ||
                routerEvent instanceof NavigationError)
            {
                this.loadig = false;
            }

    }     
    
    displayMessages():void{ //Para la ruta secundaria del mensaje
        this.router.navigate([{ outlets: {popup: ['messages']}  }]);
         
        this._messageService.isDisplayedMessages = true;
    }

    hideMessages():void{
        this.router.navigate([{ outlets: {popup: null } }]);//Para limpiar la ruta secundaria y se oculte
        this._messageService.isDisplayedMessages = false;//Para ocultar el mensaje
        
    }


    logOut(): void {
        this.authService.logout();
        console.log('Log out');

        this.router.navigateByUrl('/welcome');//Cuando usamos navigateByUrl le indicamos que queremsoq ue borre todo parametro que tenga ahi en la ruta para que al momento de desloguearse no quede nada que se pueda usar
    }
}
