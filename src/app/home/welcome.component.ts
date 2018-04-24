import { Component } from '@angular/core';

@Component({
   // selector: 'app-home', ///Ya no usamos el selector puesto que como no lo vamos a anidar directamente si no que lo usaremos por via de rutas ya no es necesario 
    templateUrl: './app/home/welcome.component.html'
})
export class WelcomeComponent {
    public pageTitle: string = 'Welcome';
}
