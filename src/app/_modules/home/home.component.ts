import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../_models';
import { UserService, AuthenticationService, AlertService } from '../../_services';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    currentUser: User;
    userDetails:any;
    users = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService,
        private router: Router,
        public menuCtrl: MenuController,
    ) {
        this.menuCtrl.enable(true);
        debugger
        this.userDetails = this.authenticationService.currentUserValue;
         // authorised so return true
         if (!this.userDetails.userState || !this.userDetails.userDivision || !this.userDetails.userDistrict || !this.userDetails.userZone || !this.userDetails.userGrampanchayat) {
            this.router.navigate(['/registervillage']);
         }
         else this.currentUser =  this.userDetails;
    }

    ngOnInit() {
       // this.loadAllUsers();
    //    this.alertService.presentAlert(['Login successful','', 'Hi Abhay, Welcome to my complain', 'OK']);

    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    private loadAllUsers() {
        debugger
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }
}