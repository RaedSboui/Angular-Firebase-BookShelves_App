import { environment } from './../environments/environment';
import { Component } from '@angular/core';
import  firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){
    firebase.initializeApp(environment.firebaseConfig)
  }
}
