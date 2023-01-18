import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  handleLogin() {
    var email = (<HTMLInputElement>document.getElementById('emailT')).value;
    var pass = (<HTMLInputElement>document.getElementById('passT')).value;

    this.auth.login(email, pass);
  }

  handleResetPassword() {

    var email = (<HTMLInputElement>document.getElementById('emailT')).value;
    this.auth.resetPassword(email);
  }
}
