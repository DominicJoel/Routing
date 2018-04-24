"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var product_list_component_1 = require("./product-list.component");
var product_detail_component_1 = require("./product-detail.component");
var product_edit_component_1 = require("./product-edit.component");
//Rutas hijas
var product_edit_tags_component_1 = require("./product-edit-tags.component");
var product_edit_info_component_1 = require("./product-edit-info.component");
//Servicio resolver
var product_resolver_service_1 = require("./product-resolver.service");
//servicio del guard
var auth_guard_service_1 = require("../user/auth-guard.service");
//Servicio del  ProductGuard
var product_guard_service_1 = require("./product-guard.service");
var product_filter_pipe_1 = require("./product-filter.pipe");
var product_service_1 = require("./product.service");
//Los modulos que se pueden compartir a traves de los demas
var shared_module_1 = require("../shared/shared.module");
var ProductModule = (function () {
    function ProductModule() {
    }
    return ProductModule;
}());
ProductModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            router_1.RouterModule.forChild([
                {
                    // Quitamos el Path y el canActivate porque al momento de usar el lazyng loading esta parte no nos va a funcionar ya que lo llamamos del appRouting
                    //  path: 'products', //Lo ponemos children no tener varios componente padre
                    // canActivate: [AuthGuard],//Se lo podemos agregar a cualquiera pero se lo agregamos al padre porque mantendra a los hijos protegidos, si queremos debbugear nuestro sitema deberiamos momentaneamente comentar esto para haecrlo ya que el sistema nos la pondra muy dificil con esto activado
                    //  component: ProductListComponent,// Quitamos ese component y lo mandamos con un path vacio para que funcione los hijos de products
                    //       children: [ //Rutas hija de products
                    //                 {
                    path: '',
                    component: product_list_component_1.ProductListComponent //Es importante que creemos un path vacio para que nos funcione los children
                },
                {
                    path: ':id',
                    component: product_detail_component_1.ProductDetailComponent,
                    resolve: { product: product_resolver_service_1.productResolver },
                },
                {
                    path: ':id/edit',
                    component: product_edit_component_1.ProductEditComponent,
                    canDeactivate: [product_guard_service_1.ProductEditGuard],
                    resolve: { product: product_resolver_service_1.productResolver },
                    children: [
                        {
                            path: '',
                            redirectTo: 'info',
                            pathMatch: 'full'
                        },
                        {
                            path: 'info',
                            component: product_edit_info_component_1.ProductEditInfoComponent
                        },
                        {
                            path: 'tags',
                            component: product_edit_tags_component_1.ProductEditTagsComponent
                        }
                    ]
                }
            ])
        ],
        declarations: [
            product_list_component_1.ProductListComponent,
            product_detail_component_1.ProductDetailComponent,
            product_edit_component_1.ProductEditComponent,
            product_edit_info_component_1.ProductEditInfoComponent,
            product_edit_tags_component_1.ProductEditTagsComponent,
            product_filter_pipe_1.ProductFilterPipe
        ],
        providers: [
            product_service_1.ProductService,
            product_resolver_service_1.productResolver,
            auth_guard_service_1.AuthGuard,
            product_guard_service_1.ProductEditGuard
        ]
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map