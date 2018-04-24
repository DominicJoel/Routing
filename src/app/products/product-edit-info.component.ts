import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { IProduct } from './product';

@Component({
    templateUrl: './app/products/product-edit-info.component.html'
})
export class ProductEditInfoComponent implements OnInit {
    @ViewChild(NgForm) productForm: NgForm;//Esto para trabajar con el formulario desde aqui 

    errorMessage: string;
    product :IProduct ;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
                //Usamos parent para capturar el valor que tiene la padre del resolve que es Edit
                this.route.parent.data.subscribe( data =>{
                        
                        this.product = data['product'];//Recordemos que el product que esta dentro de data es el nombre del resolve

                        if (this.productForm){//En el subscribe hacemos esto puesto que las validaciones, cuando estas cambian de estado queremos que la borre ya que el Oninit no reinicia por eso lo hacemos el el susbscribe
                            this.productForm.reset();
                        }
                })
       }
}
