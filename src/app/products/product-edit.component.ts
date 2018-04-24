import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { MessageService } from '../messages/message.service';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './app/products/product-edit.component.html',
    styleUrls: ['./app/products/product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
    pageTitle: string = 'Product Edit';
    errorMessage: string;

   
    private dataIsValid: {[key:string]: boolean} = {};//Para validar la data de los componentes hijo de edit, al momento de q los formularios establezcan que no es valida
    private currentProduct:IProduct;//Para hacer una copia del producto original
    private originalProduct:IProduct;//Para agarrar el producto


    //Le hacemos un getter y setter al producto
   get product():IProduct{
       return this.currentProduct;
   }
     set product(value : IProduct){
         this.currentProduct = value;
         //Clonamos el objeto para retener una copia
         this.originalProduct = Object.assign({}, value);//El Object.assign lo que hace es que asigna el valor y en el parentesis retiene la copia, y el value el que se esta mandando
     }
    
     //Comprobamos para ver si los datos son iguales
     get isDirty(): boolean{
                   return JSON.stringify(this.originalProduct) !== JSON.stringify(this.currentProduct);//Devolvera verdadero si son diferentes de lo contrario devolvera falso
     }


    constructor(private productService: ProductService,
                private messageService: MessageService,
                private route : ActivatedRoute,
                private router : Router) { }


         ngOnInit(): void{
  
            this.route.data.subscribe(
                data =>{
                    this.onProductRetrieved(data['product']);//Al metodo onProductRetrieve le mandamos como parametro el producto que devuelve el resolve
                }
            );

         //    this.route.params.subscribe(//Cuando usamos el observable por encima del snapshot forzamos a que capture los cambios realizados en este caso la Url
         //           params => {
        //                let id = +params['id'];
        //                this.getProduct(id);
         //           }
         //    );



             //let id = +this.route.snapshot.params['id'];
             //this.getProduct(id);
         }        



   // getProduct(id: number): void {
 //       this.productService.getProduct(id)
 //           .subscribe(
  //              (product: IProduct) => this.onProductRetrieved(product),
  //              (error: any) => this.errorMessage = <any>error
   //         );
  //  }


      
    onProductRetrieved(product: IProduct): void {
            this.product = product;

            if (this.product.id === 0) {
                this.pageTitle = 'Add Product';
            } else {
                this.pageTitle = `Edit Product: ${this.product.productName}`;
            }
    }


    deleteProduct(): void {
            if (this.product.id === 0) {
                // Don't delete, it was never saved.
                this.onSaveComplete();
        } else {
                if (confirm(`Really delete the product: ${this.product.productName}?`)) {
                    this.productService.deleteProduct(this.product.id)
                        .subscribe(
                            () => this.onSaveComplete(`${this.product.productName} was deleted`),
                            (error: any) => this.errorMessage = <any>error
                        );
                }
            }
    }


    isValid(path: string): boolean{ //Este metodo, es para la funcion que va a validar los datos hijos
        this.validate();//Llamamos al metodo

        if(path){
            return this.dataIsValid[path];
        }
          return(this.dataIsValid &&
                   Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));//Recorrera todas las validaciones 
    }
   
      
    reset(): void{//Este metodo es para que cuando guardemos la informacion esas variables se reseteen es muy importante hacerlo para que no se active el DeactiveGuard
         this.dataIsValid = null;
         this.currentProduct =  null;
         this.originalProduct =  null;        
    } 


    saveProduct(): void {
            if (this.isValid(null)) {//Llamamos el metodo de arriba para validar
                this.productService.saveProduct(this.product)
                    .subscribe(
                        () => this.onSaveComplete(`${this.product.productName} was saved`),
                        (error: any) => this.errorMessage = <any>error
                    );
            } else {
                this.errorMessage = 'Please correct the validation errors.';
            }
    }


    onSaveComplete(message?: string): void {
                if (message) {
                    this.messageService.addMessage(message);
                }
                 this.reset();//Cuando guardemos activamos este metodo que limpia
                // Navigate back to the product list

                this.router.navigate(['/products']);//Para que una vez muestre el msj me redireeciona a la pagina padre
    }
        

    validate(): void{ //Metodo para la validacion de datos
            
                //Clear the validation object
                this.dataIsValid = {}; //Esto nos asegura que cada vez que validemos este limpia

                // 'info' tab, aqui validamos los datos de el componente hijo (info) y repetimos la validacion que tiene en el formulario que esta en (info) 
                if ( this.product.productName &&
                    this.product.productName.length >= 3 &&
                    this.product.productCode
                    ){
                        this.dataIsValid['info'] = true; //Esa es la variable de Data Valid
                    } else {
                        this.dataIsValid['info'] = false;
                    }
            
                // 'tags' tab, aqui validamos los datos de el componente hijo (tag) y repetimos la validacion que tiene en el formulario que esta en (tag) 
                if ( this.product.category &&
                    this.product.productName.length >= 3){
                    this.dataIsValid['tags'] = true; //Esa es la variable de Data Valid
                } else {
                    this.dataIsValid['tags'] = false;
                }
            }


}
