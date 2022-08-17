import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { Database, ref, set, getDatabase, onChildAdded, query, limitToLast, 
        orderByKey, off} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class MessagesService {

  private db = getDatabase();
  private mRef = ref(this.db, '/messages');
  public list: any[] = [];
  private index = 1;
  private recentPosts;

  constructor(private database: Database) { 
    this.list = [];
    this.recentPosts = query(this.mRef, limitToLast(this.index), orderByKey());
    onChildAdded(this.recentPosts, (data) => {
      this.list.push([data.val().name, data.val().message, data.key, data.val().location, data.val().image]);
    });
    this.index += 10;
  }

  public async writeMessage(block) {
    await set(ref(this.database, 'messages/' + block.date), {
      name: block.name,
      message: block.message,
      date: block.date,
      location: block.location,
      isImage: block.isImage,
      imagePath: block.imagePath,
    });   
  }

  public loadData() {
    off(this.recentPosts);
    this.list = [];
    this.recentPosts = query(this.mRef, limitToLast(this.index), orderByKey());
    onChildAdded(this.recentPosts, (data) => {
      this.list.push([data.val().name, data.val().message, data.key, data.val().location, data.val().isImage, data.val().imagePath]);
    });
    this.index += 10;
  }

}