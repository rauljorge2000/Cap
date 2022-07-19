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
    if(this.message == "") {
      alert("No se puede enviar un mensaje sin texto.");
    } else {
      console.log(this.message);
      this.mService.writeMessage(new Date(), this.auth.auth.currentUser.displayName, this.message);
      this.message = "";
    }
  }
}
