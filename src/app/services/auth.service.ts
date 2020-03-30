import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../userAuth/user.model';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

    user$: Observable<User>;
    logonStatus;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router
    ) { 
      // Busca o estado de autenticação, depois busca o documento Firestore do usuário ou retorna nulo
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
            // Logado
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            // Deslogado
            return of(null);
          }
        })
      )
    }


    async googleSignin() {
      const provider = new auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      return this.updateUserData(credential.user);
    }

    async CreateWithEmail(user) {
      try {
      const credential = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      return this.updateUserData(credential.user);
      } catch (err) {
        console.log(err)
      }
    }

    async EmailSignin(user) {
        this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
        return this.updateUserData(user);
    }

  
    private updateUserData({ uid,email,displayName,photoURL }) {
      // Define os dados do usuário para o firestore no login
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);
  
      const data = { 
        uid,
        email,
        displayName,
        photoURL
      } 
  
      return userRef.set(data, { merge: true })
  
    }
  
    async signOut() {
      await this.afAuth.auth.signOut();
      this.router.navigate(['/']);
    }

    
}
