import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Base64 } from '@ionic-native/base64/ngx';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { formatDate,Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-atikraman',
  templateUrl: './atikraman.component.html',
  styleUrls: ['./atikraman.component.scss'],
})
export class AtikramanComponent implements OnInit {
  
  complainImagepath : SafeResourceUrl;
  profilePicBase64 : string;
  today = new Date();
  todayDate = '';
  constructor(
    private imagePicker: ImagePicker,
    private camera: Camera,
    private crop: Crop,
    public actionSheetController: ActionSheetController,
    private file: File,
    private base64: Base64,
    private sanitizer: DomSanitizer,
    private location: Location,
    private route: ActivatedRoute
  ) { 
    this.todayDate = formatDate(this.today, 'dd-MMM-yyyy hh:mm:ss a', 'en-US', '+0530');
  }

  ngOnInit() {
    this.complainImagepath = 'assets/imgs/ImagePlaceholder.jpg';
   
  }
  myBackButton(){
    this.location.back();
  }
   // code to get the profile image
   pickImage(sourceType) {
    console.log(sourceType);
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.cropImage(imageData)
    }, (err) => {
      // Handle error
      console.log(err);
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Galary',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  cropImage(fileUrl) {
    this.crop.crop(fileUrl, { quality: 50 })
      .then(
        newPath => {
          this.showCroppedImage(newPath.split('?')[0])
        },
        error => {
          alert('Error cropping image' + error);
        }
      );
  }

  showCroppedImage(ImagePath) {
    var copyPath = ImagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];
    this.base64.encodeFile(ImagePath).then((base64File: string) => {
      this.profilePicBase64 = base64File;
      this.complainImagepath = this.sanitizer.bypassSecurityTrustResourceUrl(base64File);
    }, (err) => {
      console.log(err);
    });

  
  }

}
