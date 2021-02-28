/*Angular material components-Routers configured into this module*/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
/*Import all Component instances into this module */

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AboutProductComponent } from './about-product/about-product.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


/*Configure all routes along with component and path name*/
const routes: Routes = [
  { path: '', component: AboutProductComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'forgotpwd', component: ForgotPasswordComponent },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
