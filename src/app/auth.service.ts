import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LandingNavbarComponent } from './landing/landing-navbar/landing-navbar.component';

@Injectable({ providedIn: 'root'})
export class AuthService {

    public userLoggedIn: boolean = false;
    private currentUser: firebase.User = null;

    constructor(public aAuth: AngularFireAuth, private db: AngularFirestore, private router: Router) {
        this.aAuth.onAuthStateChanged(user => {
            this.currentUser = user;
            if (user) {
                localStorage.setItem('logged-in', 'true');
                localStorage.setItem('user-email', this.currentUser.email);
                this.userLoggedIn = true;
            } else {
                this.userLoggedIn = false;
                localStorage.removeItem('logged-in');
                localStorage.removeItem('user-email');
            }
        });
    }

    createUser(email: string, password: string, name: string) {
        var totalInfo = {};
        totalInfo["name"] = name;
        totalInfo["points"] = 0;
        totalInfo["lastCheckedIn"] = new Date("1995-12-17T03:24:00").getTime();

        this.db.collection("users").doc(email).set(totalInfo).then(()  => {
            this.aAuth.createUserWithEmailAndPassword(email, password).then(() => {
                this.router.navigate(['']);
            }).catch(error => {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        alert("Error! Email has already been registered.");
                        break;
                    case 'auth/weak-password':
                        alert("Error! Please verify your password is at least 6 characters long.");
                        break;
                    case 'auth/argument-error':
                        alert("Error! Please try inputting your email address again.");   
                        break;
                }
            });
        });
    }

    login(email: string, password: string) {
        this.aAuth.signInWithEmailAndPassword(email, password).catch(error => {
            alert("Incorrect email or password. Please try again!");
        }).then(userCredential => {
            if (userCredential) {
                localStorage.setItem('logged-in', 'true');
                localStorage.setItem('user-email', this.currentUser.email);
                this.router.navigate(['home']);
            }
        });
    }

    logout() {
        this.aAuth.signOut().then(function() {
            this.userLoggedIn = false;
            localStorage.removeItem('logged-in');
            localStorage.removeItem('user-email');
            this.router.navigate(['login']);
        }).catch(function(error) {
        });
    }

    isLogged() {
        if (this.currentUser == null && !localStorage.getItem('logged-in')) { 
            return false;
        } else {
            return true;
        }
    }

    getCurrentUser() {
        return this.currentUser;
    }
}