import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";//Para leer que los parametros  que cambiaron, en las rutas que envia parametros 

import { IProduct } from './product';
//import { ProductService } from './product.service';

@Component({
    templateUrl: './app/products/product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
    pageTitle: string = 'Product Detail';
    product: IProduct;
    errorMessage: string;

    constructor(//private productService: ProductService,
                private route: ActivatedRoute){ }//Inyectamos los servicios en el constructor 
               
                ngOnInit(): void {//Es lo primero que se crea cuando se llama el componente, el problema es que la Url no siempre cambia y si no cambia no se inicializa el Onit
                    
                    this.product = this.route.snapshot.data['product'];//El product dentro de los corchetes es el nombre del resolve que captura los datos


                    //let id = +this.route.snapshot.params['id'];//Capturamos el Id, si no usamos resolve podemos hacerlo de esta manera 
                    //this.getProduct(id);//Aqui llamamos a la funcion y le mandamos el id que necesita para que cargue el detalle antes de mostrar la pantalla, solo se usa cuando estamos seguros que la Url no cambiara
                }            
            

   // getProduct(id: number) {//Cimo lo estamos llamando del resolve no necesitamos este metodo ya el reolve lo esta haciendo
     //   this.productService.getProduct(id).subscribe(
       //     product => this.product = product,
         //   error => this.errorMessage = <any>error);
    //}
}
