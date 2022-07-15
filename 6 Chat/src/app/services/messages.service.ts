import { Injectable } from '@angular/core';

// import { Firestore, collection, docData, addDoc } from '@angular/fire/firestore';

import { getAuth } from 'firebase/auth';
import { Observable } from 'rxjs'; 
import { Database, objectVal, ref, } from '@angular/fire/database';
import { traceUntilFirst } from '@angular/fire/performance';


//service
import {AuthService} from '../services/auth.service';

//interface
import { Minterface } from '../chat/minterface';

import { FirebaseApp } from '@angular/fire/app';


@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  message: string ="";

  public readonly dataObserver$: Observable<any>;
  
  constructor(private auth: AuthService, private database: Database, private app: FirebaseApp) { 
    const doc = ref(database, 'data');
    this.dataObserver$ = objectVal(doc).pipe(
      traceUntilFirst('database')
    );


    // this.db.push({
    //   name: 'sam',
    //   date: new Date(),
    //   message: 'Mensaje de prueba',
    // });
  }

}
