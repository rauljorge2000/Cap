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
import { BrowserStack } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  private message: string = "";

  constructor(private router : Router, private auth: AuthService, 
              public mService: MessagesService) {  }

  ngOnInit() {}

  out(){
    this.auth.signOutOfGoogle();
    this.router.navigate(['home']);
  }  
  
  sendMessage() {
    if(this.message == "") {
      alert("No se puede enviar un mensaje sin texto.");
    } else {
      let dateString = new Date().getFullYear() + "_" + new Date().getMonth() + "_" + 
                       new Date().getDate() + " " + new Date().getHours() + ":" + 
                       new Date().getMinutes() + ":" + new Date().getSeconds();
      this.mService.writeMessage( dateString, getAuth().currentUser.displayName, this.message);
      this.message = "";
    }
  }

  loadData($event) {
    setTimeout(() => {
      $event.target.complete();
      this.mService.loadMoreData();
    }, 1000);
  }
}
