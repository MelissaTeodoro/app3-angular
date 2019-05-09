import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase' //Acesso a todos os recursos SDK do Firebase

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app3-angular';

  ngOnInit(): void {
    var firebaseConfig = {
      apiKey: "AIzaSyA4oqijWeVRV2ULU3i8MgQAe8vT6Qh0DqI",
      authDomain: "jta-instagram-clone-9445d.firebaseapp.com",
      databaseURL: "https://jta-instagram-clone-9445d.firebaseio.com",
      projectId: "jta-instagram-clone-9445d",
      storageBucket: "jta-instagram-clone-9445d.appspot.com",
      messagingSenderId: "184934244852",
      appId: "1:184934244852:web:071f99d4ecbbf9b3"
    };

    firebase.initializeApp(firebaseConfig)//Configurações de conexão com o projeto no Firebase
  }
}
