import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

//components
import { ChatComponent } from './chat.component';
import { AppRoutingModule } from './app_roting.module';

//services
import { AuthService } from '../services/auth.service';
import { MessagesService } from '../services/messages.service';

import { FirebaseAppModule } from '@angular/fire/app';


@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    FirebaseAppModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AuthService, MessagesService],
})
export class ChatModule { }
