import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
    templateUrl: './app/user/login.component.html'
})
export class LoginComponent {
    errorMessage: string;
    pageTitle = 'Log In';

    constructor(private authService: AuthService,
                private router : Router ) { }

    login(loginForm: NgForm) {
        if (loginForm && loginForm.valid) {
            let userName = loginForm.form.value.userName;
            let password = loginForm.form.value.password;
            this.authService.login(userName, password);
            
            // Navigate to the Product List page after log in.
             
            if (this.authService.redirectUrl){//Si el (redirectUrl) tiene valor osea es verdadero 
                this.router.navigateByUrl(this.authService.redirectUrl);//Nos va a redirecionar por Url a la Url que contenga
            }else{
                this.router.navigate(['/products']);//De lo contrario nos redirreciona a productos            
            }
           
        } else {
            this.errorMessage = 'Please enter a user name and password.';
        };
    }
}
