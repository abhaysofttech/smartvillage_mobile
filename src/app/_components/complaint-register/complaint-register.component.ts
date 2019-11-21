import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Base64 } from '@ionic-native/base64/ngx';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { formatDate } from '@angular/common';
import { ComplainService, AlertService } from '../../_services';
import { ActivatedRoute } from '@angular/router';
let users = JSON.parse(localStorage.getItem('smartvillageusers'));
@Component({
  selector: 'complaint-register',
  templateUrl: './complaint-register.component.html',
  styleUrls: ['./complaint-register.component.scss'],
})
export class ComplaintRegisterComponent implements OnInit {
  complainRegForm: FormGroup;

  complainImagepath: SafeResourceUrl;
  profilePicBase64: string;
  //today = new Date();
  complainType: any;
  subcomplainType: any;


  todayDate = '';
  constructor(
    private complainService: ComplainService,
    private imagePicker: ImagePicker,
    private camera: Camera,
    private crop: Crop,
    public actionSheetController: ActionSheetController,
    private file: File,
    private base64: Base64,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
  ) {

    setInterval(() => {
      this.todayDate = formatDate(new Date(), 'dd-MMM-yyyy hh:mm:ss a', 'en-US', '+0530');
    }, 1);
  }

  ngOnInit() {
    console.log(users);
    this.complainRegForm = this.formBuilder.group({
      cusername: ['', Validators.required],
      complainType: ['', Validators.required],
      wardDetail: ['', Validators.required],
      complainDate: ['', Validators.required],
      complainDetails: ['', Validators.required]
    });
    this.complainImagepath = 'assets/imgs/ImagePlaceholder.jpg';
    this.complainService.getcomplainname()
      .subscribe(
        data => {
          this.complainType = data;
          this.changecomplainType(this.complainType[0].complainname);
          this.complainRegForm.get('complainType').setValue(this.complainType[0].complainname);
        },
        error => {
          console.log(error);

        });
    this.route.paramMap.subscribe(params => {
      console.log(params);
      this.changecomplainType(params['params'].id);
    });

  }
  get f() {
    return this.complainRegForm.controls;
  }

  changecomplainType(complainType) {
    // this.cities = this.countryList.find(con => con.name == count).cities;
    console.log(complainType);
    this.complainService.getsubcomplainname(complainType)
      .subscribe(
        data => {
          this.subcomplainType = data;
          console.log(data);

        },
        error => {
          console.log(error);

        });
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

  onSubmit() {

    let userData = {
      email: users.email,
      firstname: users.firstname,
      lastname: users.lastname,
      phonenumber: users.phonenumber,
      userDistrict: users.userDistrict,
      userDivision: users.userDivision,
      userGrampanchayat: users.userGrampanchayat,
      userState: users.userState,
      userType: users.userType,
      userWard: users.userWard,
      userZone: users.userZone,
      userid: users.userid,
      cusername: this.f.cusername.value,
      complainType: this.f.complainType.value,
      wardDetail: this.f.wardDetail.value,
      complainDetails: this.f.complainDetails.value,
    }
    debugger
    console.log("*********" + userData)
    console.log("*********" + this.complainRegForm.value)


    // this.complainService.registerComplain(this.complainRegForm.value)
    //   .subscribe(
    //     data => {
    //       console.log(data);
    //     },
    //     error => {
    //       debugger
    //       this.alertService.error(error);
    //       //  this.loading = false;
    //     });

  }
}
