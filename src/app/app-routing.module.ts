import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './userAuth/login/login.component';
import { SignupComponent } from './userAuth/signup/signup.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch:'full' },
  { path:'login', component:LoginComponent },
  { path:'signup', component:SignupComponent }
  // { path:'signup', component:SignupComponent, canActivate: [AuthGuard] } //Auth Guard Example

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
