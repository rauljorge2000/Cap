import { Injectable } from '@angular/core';
import { Database, ref, set, getDatabase, onChildAdded} from '@angular/fire/database';
import { getAuth } from 'firebase/auth';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  message: string ="";
  private list: any[] = [];
  private auth= getAuth();

  constructor(private database: Database) { 
    const db = getDatabase();
    const mRef = ref(db, '/messages');
      onChildAdded(mRef, (data) => {
        // console.log( data.val().message, data.val().name, data.key);
        this.list.push([data.val().name, data.val().message, data.key]);
      });
      // console.log(this.list);
      // console.log(getAuth().currentUser.displayName);
  }

  public writeMessage(hdate, hname, hmessage) {
    set(ref(this.database, 'messages/' + hdate), {
      name: hname,
      message: hmessage,
      date : hdate,
    });
  }
}