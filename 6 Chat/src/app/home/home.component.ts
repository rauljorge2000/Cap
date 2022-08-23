import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private router : Router, private auth: AuthService) { }

  ngOnInit() {}

  async login() {
     await this.auth.signInWithGoogle();
     setTimeout(() => {
      this.router.navigate(['chat']);
     }, 100);
  }
}