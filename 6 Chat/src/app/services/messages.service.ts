import { Injectable } from '@angular/core';

// import { Firestore, collection, docData, addDoc } from '@angular/fire/firestore';

import { getAuth } from 'firebase/auth';
import { Observable } from 'rxjs'; 
import { Database, objectVal, ref, set, getDatabase} from '@angular/fire/database';
import { traceUntilFirst } from '@angular/fire/performance';

//service
import {AuthService} from '../services/auth.service';

//interface
import { Minterface } from '../chat/minterface';

import { FirebaseApp } from '@angular/fire/app';

// import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  message: string ="";

  public readonly dataObserver$: Observable<any>;
  

  constructor(private auth: AuthService, private database: Database, private app: FirebaseApp) { 
    // database = getDatabase(app);
    // this.dataObserver$ = database.list('dataObserver').valueChanges();
    // const ob = Observable<Database>
    const doc = ref(database, 'data');
    this.dataObserver$ = objectVal(doc).pipe(
      traceUntilFirst('database')
    );
  }

  public writeMessage(hname, hmessage, hdate) {
    const db = getDatabase();
    set(ref(db, 'messages/' + hdate), {
      name: hname,
      message: hmessage,
      date : hdate
    });
  }


  
}
