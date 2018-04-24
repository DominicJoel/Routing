import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { ProductEditComponent } from './product-edit.component';

@Injectable()
export class ProductEditGuard implements CanDeactivate<ProductEditComponent>{ //Se lo vamos a apliacar al componente ProductEditComponent para que no pierda los cambios hechos

    canDeactivate( component: ProductEditComponent): boolean {//Toma como parametro el componente  y ek componete debe ser el mismo que esta en (CanDeactivate<ProductEditComponent>)
          
        if (component.isDirty){//Si retorna verdadero hara esta pregunta ya que los datos fueron cambiados
             let productName = component.product.productName || 'New Product';
             return confirm (`Navigate away and lose all changes to ${productName}?`);
        }
        return true;//De lo contrari devuelve un true si los datos no se cambiaron
    }


}