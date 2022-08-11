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

  public signOut(){
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
    let mo = new Date().getMonth();
    mo += 1;
    let da = new Date().getDate();
    let ho = new Date().getHours();
    let mi = new Date().getMinutes();
    let se = new Date().getSeconds();
    let month = "";
    let day = "";
    let hours = "";
    let minutes = "";
    let seconds = "";
    if(mo.toString().length == 2) {month = mo.toString()} else {month = "0" + mo.toString()}
    if(da.toString().length == 2) {day = da.toString()} else {day = "0" + da.toString()}
    if(ho.toString().length == 2) {hours = ho.toString()} else {hours = "0" + ho.toString()}
    if(mi.toString().length == 2) {minutes = mi.toString()} else {minutes = "0" + mi.toString()}
    if(se.toString().length == 2) {seconds = se.toString()} else {seconds = "0" + se.toString()}

    let dateString = new Date().getFullYear() + "_" + month + "_" + day + " " + 
                                              hours + ":" + minutes + ":" + seconds;
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
      this.mService.writeMessage(this.block);
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
