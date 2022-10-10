import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public aAuth: AngularFireAuth, private db: AngularFirestore) { }

  ngOnInit(): void {
    // this.getCurrentUser();
  }

  /*
  getCurrentUser() {
    if (this.aAuth.getCurrentUser() == null) {
      if (localStorage.getItem('logged-in')) {
        this.email = localStorage.getItem('user-email');
      } 
    } else {
      this.email = this.aAuth.getCurrentUser().email;
    }
    
    this.docRef = this.db.collection('compilation').doc(this.email);
  }
  */
}
