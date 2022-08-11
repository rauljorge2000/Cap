import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//service
import {AuthService} from '../services/auth.service';
import { MessagesService } from '../services/messages.service';
import { GeolocationService } from '../services/geolocation.service'
import { CameraService } from '../services/camera.service';

import { Minterface } from '../chat/minterface';
import { getAuth } from 'firebase/auth';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})

export class ChatComponent implements OnInit {

  private message: string = "";
  private block: Minterface;

  constructor(private router : Router, private auth: AuthService, 
              public mService: MessagesService, private gService: GeolocationService,
              public cService: CameraService) {  }

  ngOnInit() {}

  public out(){
    this.auth.signOutOfGoogle();
    this.router.navigate(['home']);
  }  

  public loadData($event) {
    setTimeout(() => {
      $event.target.complete();
      this.mService.loadData();
    }, 1000);
  }

  public getDate(){
    let dateString = new Date().getFullYear() + "_" + new Date().getMonth() + "_" + 
                       new Date().getDate() + " " + new Date().getHours() + ":" + 
                       new Date().getMinutes() + ":" + new Date().getSeconds();
    return dateString;
  }

  public async sendMessage() {
    if(this.message == "") {
      alert("No se puede enviar un mensaje sin texto.");
    } else {
      let dateString = this.getDate();
      this.block = {
        name: getAuth().currentUser.displayName,
        message: this.message,
        date: dateString,
        location: (await this.gService.getCurrentPosition())
      };
      this.mService.writeMessage(this.block); //getAuth().currentUser.displayName, this.message, new Date());
      this.message = "";
    }
  }

  public async getPicture() {
    await this.cService.takePicture();
    let dateString = this.getDate();
      this.block = {
        name: getAuth().currentUser.displayName,
        message: this.message,
        date: dateString,
        location: (await this.gService.getCurrentPosition())
      };
      this.mService.writeMessage(this.block); //getAuth().currentUser.displayName, this.message, new Date());
      this.message = "";  
    }

  // public async sendPhoto() {
  //   if(this.message == "") {
  //     alert("No se puede enviar un mensaje sin texto.");
  //   } else {
  //     let dateString = this.getDate();
  //     this.block = {
  //       name: getAuth().currentUser.displayName,
  //       message: this.message,
  //       date: dateString,
  //       location: (await this.gService.getCurrentPosition())
  //     };
  //     this.mService.writeMessage(this.block); //getAuth().currentUser.displayName, this.message, new Date());
  //     this.message = "";
  //   }
  // }
}
