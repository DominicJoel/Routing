//Este servicio es para controlar la carga y que no se muestre el componente hasta que no reciba la data
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
var router_1 = require("@angular/router");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch"); //Para trabajar con los errores
require("rxjs/observable/of"); //Para trabajar con los errores
require("rxjs/add/operator/map"); //Para trabajar con los errores
var product_service_1 = require("./product.service");
var productResolver = (function () {
    function productResolver(_productService, router) {
        this._productService = _productService;
        this.router = router;
    }
    productResolver.prototype.resolve = function (route, state) {
        var _this = this;
        var id = route.params['id'];
        if (isNaN(id)) {
            console.log("El id del producto no es numerico: " + id);
            this.router.navigate(['/products']);
            return Observable_1.Observable.of(null); //Devolvera un observable nulo
        }
        return this._productService.getProduct(+id) //Esto nos permite observar si realmente capturamos la data
            .map(function (product) {
            if (product) {
                return product;
            }
            console.log("El prodcuto no fue encontrado: " + id); //De lo contrario no lo encontro y nos redireciona a prodcutos
            _this.router.navigate(['/products']);
            return null;
        })
            .catch(function (error) {
            console.error("Error para recibir los datos " + error);
            _this.router.navigate(['/products']);
            return Observable_1.Observable.of(null);
        });
        //  let id = +route.params['id'];
        // return this._productService.getProduct(id);
    };
    return productResolver;
}());
productResolver = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        router_1.Router])
], productResolver);
exports.productResolver = productResolver;
//# sourceMappingURL=product-resolver.service.js.map