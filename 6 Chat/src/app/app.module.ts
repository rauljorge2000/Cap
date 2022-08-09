import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

//ionic
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

//components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';

//modules
import { initializeApp } from 'firebase/app';
import { FirebaseAppModule, provideFirebaseApp } from '@angular/fire/app';
import { DatabaseModule} from '@angular/fire/database';
import { GuardianGuard } from './guardian.guard';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    FirebaseAppModule,
    DatabaseModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, GuardianGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
