import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
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
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  public message: string = "";
  public block: Minterface;

  constructor(private router : Router, public auth: AuthService, 
              public mService: MessagesService, private gService: GeolocationService,
              public cService: CameraService) { 
                this.mService.loadData();
              }

  ngOnInit() { 
      setTimeout(() => {
      this.myScrollContainer.nativeElement.addEventListener('scroll', () =>{
        if(this.myScrollContainer.nativeElement.scrollTop == 0  ) {
          this.loadData();
        }
      })
    , 10});
    setTimeout( () => { this.scrollToBottom()}, 1500);
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { console.log(err) }                 
  }

  public signOut(){
    this.auth.signOutOfGoogle();
    this.router.navigate(['home']);
  }  

  public loadData() {
    setTimeout(() => {
      this.mService.loadData();
    }, 10);
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

    let dateString = new Date().getFullYear() + "_" + month + "_" + day + "-" + 
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
        location: (await this.gService.getCurrentPosition()),
        isImage: false,
        imagePath: ""
      };
      await this.mService.writeMessage(this.block);
      this.message = "";
      this.scrollToBottom();
    }
  }

  public async sendPicture() {
    await this.cService.takePicture().then(() => { }). catch((error) => console.log(error));;
    let dateString = this.getDate();
      this.block = {
        name: getAuth().currentUser.displayName,
        message: "",
        date: dateString,
        location: (await this.gService.getCurrentPosition()),
        isImage: true,
        imagePath: await this.cService.imgRes
      };
      await this.mService.writeMessage(this.block); 
      this.message = "";  
      setTimeout( () => { this.scrollToBottom()}, 400);
    }
}
