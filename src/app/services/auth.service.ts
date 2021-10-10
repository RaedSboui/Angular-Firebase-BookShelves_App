import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  createNewUser(email: string, password: string){
    return new Promise<void>(
      (resolve, rejects) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            rejects(error);
          }
        );
      }
    );
  }

  signInUser(email: string, password: string){
    return new Promise<void>(
      (resolve, rejects) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            rejects(error);
          }
        );
      }
    );
  }

  signOutUser(){
    firebase.auth().signOut();
  }
}
