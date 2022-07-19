import { Injectable } from '@angular/core';

// import { Firestore, collection, docData, addDoc } from '@angular/fire/firestore';

import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';
import { Database, objectVal, ref, set, getDatabase, get, child, onValue, onChildAdded} from '@angular/fire/database';
import { traceUntilFirst } from '@angular/fire/performance';



@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  message: string ="";


  constructor(private database: Database) { 
    let list = [];
    const db = getDatabase();
    const mRef = ref(db, '/messages');
      onChildAdded(mRef, (data) => {
        // this.writeMessage( data.val().message, data.val().name, data.key);
        console.log( data.val().message, data.val().name, data.key);
        list.push([data.val().name, data.val().message, data.key]);
      });
      console.log(list);

    // const dbRef = ref(db, '/messages');
    // onValue(dbRef, (snapshot) => {
    //   snapshot.forEach((childSnapshot) => {
    //     const childKey = childSnapshot.key;
    //     const childData = childSnapshot.val();
    //     // ...
    //     console.log(childSnapshot.val().message);
    //     list.push([childSnapshot.key, childSnapshot.val().name, childSnapshot.val().message]);
    //   });
    // }, {
    //   onlyOnce: true
    // });
    // console.log(list);
  


    // const mRef = ref(db, '/messages');
    // onChildAdded(mRef, (data) => {
    //   this.writeMessage( data.val().message, data.val().name, data.key);
    //   console.log( data.val().message, data.val().name, data.key);
    //   // this.list.push([data.val().message, data.val().name, data.key]);
    // });
    


    // const dbRef = ref(getDatabase());
    // get(child(dbRef, `messages/`)).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     const list = snapshot.val();
    //     console.log(list);
    //   } else {
    //     console.log("No data available");
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // });
  }

  public writeMessage(hdate,hname, hmessage) {
    // list.push([hdate, hname, hmessage]);
    set(ref(this.database, 'messages/' + hdate), {
      name: hname,
      message: hmessage,
      date : hdate
    });
  }
}