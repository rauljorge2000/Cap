import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { Database, ref, set, getDatabase, onChildAdded, query, limitToLast, 
        orderByKey, off} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class MessagesService {

  @ViewChild('cDiv') myScrollContainer: ElementRef;

  private db = getDatabase();
  private mRef = ref(this.db, '/messages');
  private list: any[] = [];
  private index = 10;
  private recentPosts;

  constructor(private database: Database) { 
    this.loadData();
  }

  public async writeMessage(block) {
    await set(ref(this.database, 'messages/' + block.date), {
      name: block.name,
      message: block.message,
      date: block.date,
      location: block.location
    });   
  }

  public loadData() {
    this.list = [];
    this.recentPosts = query(this.mRef, limitToLast(this.index), orderByKey());
    onChildAdded(this.recentPosts, (data) => {
      this.list.push([data.val().name, data.val().message, data.key, data.val().location]);
    });
    this.index += 10;
    console.log(this.list);
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
}