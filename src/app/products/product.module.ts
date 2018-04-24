import { NgModule } from '@angular/core';
import { RouterModule }  from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit.component';

//Rutas hijas
import { ProductEditTagsComponent } from './product-edit-tags.component';
import { ProductEditInfoComponent } from "./product-edit-info.component";

//Servicio resolver
import { productResolver } from "./product-resolver.service";

//servicio del guard
import { AuthGuard } from '../user/auth-guard.service';

//Servicio del  ProductGuard
import { ProductEditGuard } from './product-guard.service';

import { ProductFilterPipe } from './product-filter.pipe';
import { ProductService } from './product.service';


//Los modulos que se pueden compartir a traves de los demas
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { 

        // Quitamos el Path y el canActivate porque al momento de usar el lazyng loading esta parte no nos va a funcionar ya que lo llamamos del appRouting

      //  path: 'products', //Lo ponemos children no tener varios componente padre
       // canActivate: [AuthGuard],//Se lo podemos agregar a cualquiera pero se lo agregamos al padre porque mantendra a los hijos protegidos, si queremos debbugear nuestro sitema deberiamos momentaneamente comentar esto para haecrlo ya que el sistema nos la pondra muy dificil con esto activado
      //  component: ProductListComponent,// Quitamos ese component y lo mandamos con un path vacio para que funcione los hijos de products
 //       children: [ //Rutas hija de products
   //                 {
                      path:'',
                     component:ProductListComponent //Es importante que creemos un path vacio para que nos funcione los children
                    },           
                    { 
                      path: ':id', 
                      component: ProductDetailComponent, 
                      resolve: { product: productResolver },//Aqui añadimos el resolver
                    },
                    { 
                      path: ':id/edit',
                      component: ProductEditComponent,
                      canDeactivate: [ProductEditGuard],//Para asegurarno de los cambios
                      resolve:{ product: productResolver },
                      children:[//Rutas hija de products/:id/edit
                        { 
                          path:'',
                          redirectTo: 'info',
                          pathMatch:'full'
                        },
                        {
                          path:'info',
                          component: ProductEditInfoComponent
                        },
                        {
                          path:'tags',
                          component: ProductEditTagsComponent
                        }]
                    }
   //      ]},
     ])
  ],
  declarations: [//Las caracteristicas o cpmponenetes del modulo
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent,
    ProductFilterPipe
  ],
  providers: [//Para comunicarnos con el back-end
    ProductService,
    productResolver,
    AuthGuard,
    ProductEditGuard
  ]
})
export class ProductModule {}
