//Este servicio es para controlar la carga y que no se muestre el componente hasta que no reciba la data

import { Injectable } from "@angular/core";
import { Resolve,ActivatedRouteSnapshot,RouterStateSnapshot,Router } from "@angular/router";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';//Para trabajar con los errores
import 'rxjs/observable/of';//Para trabajar con los errores
import 'rxjs/add/operator/map';//Para trabajar con los errores

import { ProductService } from "./product.service";
import { IProduct } from './product';

@Injectable()
export class productResolver implements Resolve<IProduct>{


      constructor (private _productService : ProductService, 
                   private router : Router){}


      resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct>{//Este Observable retorna un solo Producto,
          
       let id = route.params['id'];
       
       if(isNaN(id)){//Primero nos aseguramos que reciba un numero de lo contrario lo redireciona a productos
          console.log(`El id del producto no es numerico: ${id}`);
          this.router.navigate(['/products']); 
          return Observable.of(null);//Devolvera un observable nulo
       }
          return this._productService.getProduct(+id)//Esto nos permite observar si realmente capturamos la data
            .map(  product => {
                if (product){//Si captura la data , devuelve el producto
                    return product;
                }
                console.log(`El prodcuto no fue encontrado: ${id}`);//De lo contrario no lo encontro y nos redireciona a prodcutos
                this.router.navigate([ '/products' ]);
                return null;
            })
            .catch(error => {//Cualquier otro error nos lo captura aqui
                 console.error(`Error para recibir los datos ${error}`);
                 this.router.navigate(['/products']);
                 return Observable.of(null);
            });

         //  let id = +route.params['id'];
        // return this._productService.getProduct(id);
      }
} 