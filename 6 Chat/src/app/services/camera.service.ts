import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
// import { ref } from 'firebase/database';
import { getDownloadURL, ref, getStorage, uploadString, StorageError, } from "firebase/storage";



@Injectable({
  providedIn: 'root'
})
export class CameraService {

  // picture: string;
  public file: any = undefined;
  public fileName: string = undefined;
  public imgRes: any = undefined;

  constructor() { }

  public async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri
    });

    this.file = await this.readAsBase64(image);
    this.fileName = Date.now() + '.' + image.format;

    const storage = getStorage();
    const storageRef = ref(storage, 'images/' + this.fileName);
    
    const res = await uploadString(storageRef , this.file, 'data_url').then(() => { }). catch((error) => console.log(error));

    this.imgRes = await getDownloadURL(storageRef);

    return this.imgRes;
    
  };

  private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}


