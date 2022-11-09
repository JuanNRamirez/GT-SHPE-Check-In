import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  email: any = null;
  docRef: any = null;
  eventRef: any = null;
  points: any = null;
  eventName: any = null;
  eventPoints: any = null;
  lastCheckedIn: any = null;

  constructor(private aAuth: AuthService, private db: AngularFirestore) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    if (this.aAuth.getCurrentUser() == null) {
      if (localStorage.getItem('logged-in')) {
        this.email = localStorage.getItem('user-email');
      } 
    } else {
      this.email = this.aAuth.getCurrentUser().email;
    }
    
    this.docRef = this.db.collection('users').doc(this.email);
    this.eventRef = this.db.collection('currentEvent').doc("1");
  }

  checkIn() {
    var totalInfo = {};

    this.docRef.get().toPromise().then(doc => {
      if (doc.exists) {
        this.points = Number(doc.data().points);
        this.lastCheckedIn = new Date(doc.data().lastCheckedIn);
        const now = new Date();
        var ONE_HOUR = 60 * 60 * 1000;

        console.log(now);
        console.log(this.lastCheckedIn);

        if ((now.getTime() - this.lastCheckedIn.getTime()) > ONE_HOUR) {
          this.eventRef.get().toPromise().then(doc => {
            if (doc.exists) {
              this.eventName = doc.data().name;
              this.eventPoints = Number(doc.data().points);
              this.points += this.eventPoints;
              this.lastCheckedIn = new Date();
  
              totalInfo["points"] = this.points;
              totalInfo["lastCheckedIn"] = this.lastCheckedIn.getTime();
              this.docRef.update(totalInfo);
              alert("Successfully checked-in to " + this.eventName);
            } else {
              alert("Error fetching current event data.");
            }
          });
        } else {
          alert("Error: You have checked in to an event in the past hour!")
        }
      } else {
        alert("Error fetching user data.");
      }
    }).catch(error => {
      alert("There was an error contacting our servers. Please try again!");
    });
  }
}
