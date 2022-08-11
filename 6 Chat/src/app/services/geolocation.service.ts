import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})

export class GeolocationService {

  constructor() { }

  public async getCurrentPosition()  {
    const coordinates = Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates);
    console.log((await coordinates).coords.latitude);
    return "lat:" + (await coordinates).coords.latitude + ", lon:" + (await coordinates).coords.longitude;
    // return this.getCityName((await coordinates).coords.latitude, (await coordinates).coords.longitude);
  }  
}