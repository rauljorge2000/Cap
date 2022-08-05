import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { Database, ref, set, getDatabase, onChildAdded, query, limitToLast, 
        orderByKey } from '@angular/fire/database';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})

export class MessagesService {

  message: string ="";
  private list: any[] = [];
  private auth = getAuth();
  private index = 10;
  
  constructor(private database: Database) { 
    this.loadData();
  }

  public writeMessage(block) {
    set(ref(this.database, 'messages/' + block.date), {
      name: block.name,
      message: block.message,
      date : block.date,
    });
  }

  // public loadData() {
  //   const db = getDatabase();
  //   const mRef = ref(db, '/messages');
  //   this.index += 10;
  //   this.list = [];
  //   const recentPostsRef = query(mRef, limitToLast(this.index), orderByKey());
  //     onChildAdded(recentPostsRef, (data) => {
  //       // console.log( data.val().message, data.val().name, data.key);
  //       this.list.push([data.val().name, data.val().message, data.key]);
  //       // console.log('c ' + this.index);
  //     });
  // }

  public loadData() {
    const db = getDatabase();
    const mRef = ref(db, '/messages');
    this.list = [];

    const recentPostsRefNine = query(mRef, limitToLast(this.index), orderByKey());
    onChildAdded(recentPostsRefNine, (data) => {
      this.list.push([data.val().name, data.val().message, data.key]);
    });
    this.index += 10;
    console.log(this.list);
  }
}