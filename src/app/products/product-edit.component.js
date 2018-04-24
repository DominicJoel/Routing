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
var message_service_1 = require("../messages/message.service");
var product_service_1 = require("./product.service");
var ProductEditComponent = (function () {
    function ProductEditComponent(productService, messageService, route, router) {
        this.productService = productService;
        this.messageService = messageService;
        this.route = route;
        this.router = router;
        this.pageTitle = 'Product Edit';
        this.dataIsValid = {}; //Para validar la data de los componentes hijo de edit, al momento de q los formularios establezcan que no es valida
    }
    Object.defineProperty(ProductEditComponent.prototype, "product", {
        //Le hacemos un getter y setter al producto
        get: function () {
            return this.currentProduct;
        },
        set: function (value) {
            this.currentProduct = value;
            //Clonamos el objeto para retener una copia
            this.originalProduct = Object.assign({}, value); //El Object.assign lo que hace es que asigna el valor y en el parentesis retiene la copia, y el value el que se esta mandando
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductEditComponent.prototype, "isDirty", {
        //Comprobamos para ver si los datos son iguales
        get: function () {
            return JSON.stringify(this.originalProduct) !== JSON.stringify(this.currentProduct); //Devolvera verdadero si son diferentes de lo contrario devolvera falso
        },
        enumerable: true,
        configurable: true
    });
    ProductEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (data) {
            _this.onProductRetrieved(data['product']); //Al metodo onProductRetrieve le mandamos como parametro el producto que devuelve el resolve
        });
        //    this.route.params.subscribe(//Cuando usamos el observable por encima del snapshot forzamos a que capture los cambios realizados en este caso la Url
        //           params => {
        //                let id = +params['id'];
        //                this.getProduct(id);
        //           }
        //    );
        //let id = +this.route.snapshot.params['id'];
        //this.getProduct(id);
    };
    // getProduct(id: number): void {
    //       this.productService.getProduct(id)
    //           .subscribe(
    //              (product: IProduct) => this.onProductRetrieved(product),
    //              (error: any) => this.errorMessage = <any>error
    //         );
    //  }
    ProductEditComponent.prototype.onProductRetrieved = function (product) {
        this.product = product;
        if (this.product.id === 0) {
            this.pageTitle = 'Add Product';
        }
        else {
            this.pageTitle = "Edit Product: " + this.product.productName;
        }
    };
    ProductEditComponent.prototype.deleteProduct = function () {
        var _this = this;
        if (this.product.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        }
        else {
            if (confirm("Really delete the product: " + this.product.productName + "?")) {
                this.productService.deleteProduct(this.product.id)
                    .subscribe(function () { return _this.onSaveComplete(_this.product.productName + " was deleted"); }, function (error) { return _this.errorMessage = error; });
            }
        }
    };
    ProductEditComponent.prototype.isValid = function (path) {
        var _this = this;
        this.validate(); //Llamamos al metodo
        if (path) {
            return this.dataIsValid[path];
        }
        return (this.dataIsValid &&
            Object.keys(this.dataIsValid).every(function (d) { return _this.dataIsValid[d] === true; })); //Recorrera todas las validaciones 
    };
    ProductEditComponent.prototype.reset = function () {
        this.dataIsValid = null;
        this.currentProduct = null;
        this.originalProduct = null;
    };
    ProductEditComponent.prototype.saveProduct = function () {
        var _this = this;
        if (this.isValid(null)) {
            this.productService.saveProduct(this.product)
                .subscribe(function () { return _this.onSaveComplete(_this.product.productName + " was saved"); }, function (error) { return _this.errorMessage = error; });
        }
        else {
            this.errorMessage = 'Please correct the validation errors.';
        }
    };
    ProductEditComponent.prototype.onSaveComplete = function (message) {
        if (message) {
            this.messageService.addMessage(message);
        }
        this.reset(); //Cuando guardemos activamos este metodo que limpia
        // Navigate back to the product list
        this.router.navigate(['/products']); //Para que una vez muestre el msj me redireeciona a la pagina padre
    };
    ProductEditComponent.prototype.validate = function () {
        //Clear the validation object
        this.dataIsValid = {}; //Esto nos asegura que cada vez que validemos este limpia
        // 'info' tab, aqui validamos los datos de el componente hijo (info) y repetimos la validacion que tiene en el formulario que esta en (info) 
        if (this.product.productName &&
            this.product.productName.length >= 3 &&
            this.product.productCode) {
            this.dataIsValid['info'] = true; //Esa es la variable de Data Valid
        }
        else {
            this.dataIsValid['info'] = false;
        }
        // 'tags' tab, aqui validamos los datos de el componente hijo (tag) y repetimos la validacion que tiene en el formulario que esta en (tag) 
        if (this.product.category &&
            this.product.productName.length >= 3) {
            this.dataIsValid['tags'] = true; //Esa es la variable de Data Valid
        }
        else {
            this.dataIsValid['tags'] = false;
        }
    };
    return ProductEditComponent;
}());
ProductEditComponent = __decorate([
    core_1.Component({
        templateUrl: './app/products/product-edit.component.html',
        styleUrls: ['./app/products/product-edit.component.css']
    }),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        message_service_1.MessageService,
        router_1.ActivatedRoute,
        router_1.Router])
], ProductEditComponent);
exports.ProductEditComponent = ProductEditComponent;
//# sourceMappingURL=product-edit.component.js.map