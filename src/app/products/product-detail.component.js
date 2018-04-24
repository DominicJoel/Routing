"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router"); //Para leer que los parametros  que cambiaron, en las rutas que envia parametros 
//import { ProductService } from './product.service';
var ProductDetailComponent = (function () {
    function ProductDetailComponent(//private productService: ProductService,
        route) {
        this.route = route;
        this.pageTitle = 'Product Detail';
    } //Inyectamos los servicios en el constructor 
    ProductDetailComponent.prototype.ngOnInit = function () {
        this.product = this.route.snapshot.data['product']; //El product dentro de los corchetes es el nombre del resolve que captura los datos
        //let id = +this.route.snapshot.params['id'];//Capturamos el Id, si no usamos resolve podemos hacerlo de esta manera 
        //this.getProduct(id);//Aqui llamamos a la funcion y le mandamos el id que necesita para que cargue el detalle antes de mostrar la pantalla, solo se usa cuando estamos seguros que la Url no cambiara
    };
    return ProductDetailComponent;
}());
ProductDetailComponent = __decorate([
    core_1.Component({
        templateUrl: './app/products/product-detail.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute])
], ProductDetailComponent);
exports.ProductDetailComponent = ProductDetailComponent;
//# sourceMappingURL=product-detail.component.js.map