import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})

export class GeolocationService {

  constructor() { }

  public async getCurrentPosition()  {
    const coordinates = Geolocation.getCurrentPosition();
    return this.getCityName((await coordinates).coords.latitude, (await coordinates).coords.longitude);
  }  
  
  public async getCityName(lat, lon) {
    let res = await fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude='+lat+'&longitude='+lon+'&localityLanguage=en')
    let resJSON = await res.json();
    let city = await resJSON.locality;
    return city;
  }
}