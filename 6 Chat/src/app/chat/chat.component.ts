import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Database, objectVal, ref } from '@angular/fire/database';
import { Observable } from 'rxjs'; 
import { traceUntilFirst } from '@angular/fire/performance';

//service
import {AuthService} from '../services/auth.service';
import { MessagesService } from '../services/messages.service';

//interface
import { Minterface } from '../chat/minterface';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  message: string = "";
  constructor(private router : Router, private auth: AuthService, public mService: MessagesService) {  
    
  }

  ngOnInit() {}

  out(){
    this.auth.signOutOfGoogle();
    this.router.navigate(['home']);
  }  
  sendMessage() {
    console.log(this.message);
    this.mService.writeMessage(this.auth.auth.currentUser.uid, this.message, Date.now());
    [this.message] = "";
  }
}
