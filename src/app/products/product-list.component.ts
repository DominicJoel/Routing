import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './app/products/product-list.component.html',
    styleUrls: ['./app/products/product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;//Para mostrar las imagenes
    listFilter: string;//Para filtrar los productos en la tabla
    errorMessage: string;//El error que produzca

    products: IProduct[];

    constructor(private productService: ProductService,
                private route: ActivatedRoute) { }

    toggleImage(): void {//Para mostrar y ocultar la imagen
        this.showImage = !this.showImage;
    }




    ngOnInit(): void {

        this.listFilter = this.route.snapshot.queryParams['filterBy'] || '';//Este es ubo de los query params que lo seteamos en el Onit para que cargue la pagina con esos parametros , ya que se lo asignamos directamente a la variable
        this.showImage = this.route.snapshot.queryParams['showImage'] === 'true';//Al igual que este esta en comilla simples porque son valores que obtenemos de la Url como parametros


        this.productService.getProducts() //Para que desde que cargue capture todos los productos
                .subscribe(products => this.products = products,
                           error => this.errorMessage = <any>error);
    }
}
