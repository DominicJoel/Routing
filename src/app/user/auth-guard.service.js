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
//Este es para el canActivate para protejer la ruta del user
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_service_1 = require("./auth.service");
var AuthGuard = (function () {
    function AuthGuard(_authService, router) {
        this._authService = _authService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        return this.checkLoggedIn(state.url); // El RouterStateSnapshot contiene la url completa, ya que el ActivatedRouteSnapshot la tiene sementada por eso no nos sirve en este caso 
    };
    AuthGuard.prototype.canLoad = function (route) {
        return this.checkLoggedIn(route.path);
    };
    AuthGuard.prototype.checkLoggedIn = function (url) {
        if (this._authService.isLoggedIn()) {
            return true;
        }
        this._authService.redirectUrl = url; //Esto es para que al momento de logearse nos dirija a la pagina correcta, no a una en especifico
        this.router.navigate(['/login']); //De lo contrario nos redirreciona a la pagina principal y devuelve un falso
        return false;
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        router_1.Router])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth-guard.service.js.map