import { Injectable } from '@angular/core';
import { Database, ref, set, getDatabase, onChildAdded, query, limitToLast, limitToFirst} from '@angular/fire/database';
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
    const recentPostsRef = query(mRef, limitToLast(10));
      onChildAdded(recentPostsRef, (data) => {
        //console.log( data.val().message, data.val().name, data.key);
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

  public loadMoreData() {
    const db = getDatabase();
    const mRef = ref(db, '/messages');
    const recentPostsRef = query(mRef, limitToLast(10));
      onChildAdded(recentPostsRef, (data) => {
        //console.log( data.val().message, data.val().name, data.key);
        this.list.push([data.val().name, data.val().message, data.key]);
      });
  }
}