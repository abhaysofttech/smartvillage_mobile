import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController, MenuController } from '@ionic/angular';
import { Base64 } from '@ionic-native/base64/ngx';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('smartvillageusers')) || [];


import { AlertService, UserService, AuthenticationService } from '../../_services';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  croppedImagepath: SafeResourceUrl;
  profilePicBase64: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private imagePicker: ImagePicker,
    public menuCtrl: MenuController,
    private camera: Camera,
    private crop: Crop,
    public actionSheetController: ActionSheetController,
    private file: File,
    private base64: Base64,
    private sanitizer: DomSanitizer
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.croppedImagepath = 'assets/imgs/blank-avatar.jpg';

    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phonenumber: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    debugger;
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // check for user profile 
    if (this.croppedImagepath !== 'assets/imgs/blank-avatar.jpg') {
      this.registerForm.value.userProfilePic = this.profilePicBase64;
    }
    this.loading = true;
    this.userService.register(this.registerForm.value)
      //  .pipe(first())
      .subscribe(
        data => {
          this.registerForm.value.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
          users.push(this.registerForm.value);
          this.authenticationService.login(this.f.phonenumber.value, this.f.password.value)
            .pipe(first())
            .subscribe(
              data => {
                debugger;
                this.alertService.presentAlert(['Login successful', '', 'Hi ' + data.firstname + ', Welcome to my complain', 'OK']);
                this.router.navigate(['/registervillage']);
              },
              error => {
                this.alertService.error(['Login Fail', '', error]);
                this.loading = false;
              });

          // localStorage.setItem('smartvillageusers', JSON.stringify(users));
          // this.alertService.success('Registration successful', true);
          // this.alertService.presentAlert(['Registration successful', '','Hi ' + this.registerForm.value.firstname + ', Welcome to my complain', 'OK']);

          // this.router.navigate(['/registervillage']);
        },
        error => {
          debugger
          this.alertService.error(['Register Fail', '', error]);
          this.loading = false;
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
      console.log(imageData);

      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.cropImage(imageData)
    }, (err) => {
      // Handle error
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
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
      //   console.log(base64File);
      //  this.croppedImagepath = base64File;
      this.profilePicBase64 = base64File;
      this.croppedImagepath = this.sanitizer.bypassSecurityTrustResourceUrl(base64File);
    }, (err) => {
      console.log(err);
    });

    // this.file.readAsDataURL(filePath, imageName).then(base64 => {
    //     this.croppedImagepath = base64;
    // }, error => {
    //     alert('Error in showing image' + error);
    // });
  }
}
