import{ Component } from '@angular/core';
import { NavController, ActionSheetController, LoadingController } from 'ionic-angular';
import { Camera, PictureSourceType } from '@ionic-native/camera';
import * as Tesseract from 'tesseract.js';
import { NgProgress } from '@ngx-progressbar/core';
import { NavController, ActionSheetController } from '../../../node_modules/@ionic/angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html'
})
export class HomePage{
  selectedImage: string;
  imageText: string;

  constructor(public navCtrl: NavController, private camera: Camera, private actionSheetController: ActionSheetController, public progress: NgProgress){
  }

  selectSource(){
    let actionSheet = this.actionSheetController.create({
      buttons: [
        {
          text: 'Use Library',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, {
          text: 'Capture Image',
          handler: () => {
            this.getPictureSourceType.PHOTOLIBRARY);
          }
        }, {
          text: 'Cancel',
          role: 'Cancel'
        }
      ]
    });
    actionSheet.present();
  }

  getPicture(sourceType: PictureSourceType){
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: sourceType,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      this.selectedImage = data:image/jpeg;base64,${imageData};
    });
  }

  recognizeImage(){
    Tesseract.recognize(this.selectedImage)
    .progress(message => {
      if(message.status === 'recognize text')
      this.progress.set(message.progress);
    })
    .catch(err => console.error(err))
    .then(result => {
      this.imageText = result.text;
    })
    .finally(resultOrError => {
      this.progress.complete();
    })
  }
}