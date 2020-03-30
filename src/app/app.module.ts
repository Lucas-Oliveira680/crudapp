import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './userAuth/login/login.component';
import { SignupComponent } from './userAuth/signup/signup.component';
import { TopbarComponent } from './topbar/topbar.component';
import { ReactiveFormsModule } from '@angular/forms';

const config = {
  apiKey: "AIzaSyBql7xk63KA0RYs4Dcg5LEWFnJ2dNNiRuU",
  authDomain: "project-crud-app.firebaseapp.com",
  databaseURL: "https://project-crud-app.firebaseio.com",
  projectId: "project-crud-app",
  storageBucket: "project-crud-app.appspot.com",
  messagingSenderId: "930562954125",
  appId: "1:930562954125:web:b45d8500a6cf77106ba3c4",
  measurementId: "G-1TV079VWY6"
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TopbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
