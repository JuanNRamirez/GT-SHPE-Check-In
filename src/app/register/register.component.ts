import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  handleRegister() {
    var email = (<HTMLInputElement>document.getElementById('emailT')).value;
    var pass = (<HTMLInputElement>document.getElementById('passT')).value;
    var name = (<HTMLInputElement>document.getElementById('nameT')).value;

    this.auth.createUser(email, pass, name);
  }
}
