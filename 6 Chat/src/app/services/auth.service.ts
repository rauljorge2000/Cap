import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment'; 
import { Observable } from 'rxjs';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { Auth, authState, getAuth, User, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut } from '@angular/fire/auth';
import { FirebaseApp } from '@angular/fire/app';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public auth = getAuth();
  public provider = new GoogleAuthProvider();
  userData?: User;

  constructor(private route : Router, private app: FirebaseApp) {
    app = initializeApp(environment.firebaseConfig);
    authState(this.auth).subscribe((u) => {
      this.userData = u || null;
    });

  }

  public signInWithGoogle = () => signInWithPopup(this.auth, this.provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
  }); 

  async signOutOfGoogle() {
    return await signOut(this.auth);
  }

  
  // public signInRedirecting = () => signInWithRedirect(this.auth, this.provider);


  // public getRedirectingResult = () => getRedirectResult(this.auth)
  // .then((result) => {
  //   // This gives you a Google Access Token. You can use it to access Google APIs.
  //   const credential = GoogleAuthProvider.credentialFromResult(result);
  //   const token = credential.accessToken;

  //   // The signed-in user info.
  //   const user = result.user;
  // }).catch((error) => {
  //   // Handle Errors here.
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // The email of the user's account used.
  //   const email = error.customData.email;
  //   // The AuthCredential type that was used.
  //   const credential = GoogleAuthProvider.credentialFromError(error);
  //   // ...
  // });

  // public signOutOfGoogle = signOut(this.auth).then(() => {
  //   // Sign-out successful.
  // }).catch((error) => {
  //   // An error happened.
  // });

  // async signInWithGoogle() {
  //   return await signInWithPopup(this.auth, new GoogleAuthProvider());
  // }
}

