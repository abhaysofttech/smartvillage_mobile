import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertService, AdminService, UserService, AuthenticationService } from 'src/app/_services';
import { Router } from '@angular/router';
import { of } from 'rxjs';


@Component({
  selector: 'app-register-village',
  templateUrl: './register-village.component.html',
  styleUrls: ['./register-village.component.scss'],
})
export class RegisterVillageComponent implements OnInit {

  // registerVillageForm: FormGroup;

  stateList: any;
  divisionList: any;
  districtList: any;
  tehsilsList: any;
  grampanchayatList: any;
  defaultState: any;
  userData:any;
  localUserData:any;

  constructor(
    private alertService: AlertService,
    private adminService: AdminService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {

    this.adminService.getAllStates()
      //  .pipe(first())
      .subscribe(
        data => {
          this.stateList = data;
          this.registerVillageForm.get('userState').setValue(this.stateList, { onlySelf: true });
          this.changeState(this.stateList[0].statename);
        },
        error => {
          this.alertService.error(error);
        });
        this.localUserData  = JSON.parse(localStorage.getItem('smartvillageusers'));
  }

  registerVillageForm = this.formBuilder.group({
    userState: ['', Validators.required],
    userDivision: ['', Validators.required],
    userDistrict: ['', Validators.required],
    userZone: ['', Validators.required],
    userGrampanchayat: ['', Validators.required],
  });
  ngOnInit() {
    debugger;

    // this.adminService.getAllStates()
    //   //  .pipe(first())
    //   .subscribe(
    //     data => {
    //       debugger
    //       this.stateList = data;
    //       // this.changeState(this.stateList[0].statename);
    //       this.setFormControlValues(this.stateList[0]);
    //       this.registerVillageForm.get('userState').setValue(this.stateList, { onlySelf: true });
    //       // async orders
    //     //  this.registerVillageForm.controls.userState.patchValue(this.stateList[0].statename);

    //     },
    //     error => {
    //       this.alertService.error(error);
    //       //  this.loading = false;
    //     });

  }
  get f() {
    return this.registerVillageForm.controls;
  }
  changeState(statename) {
    // this.cities = this.countryList.find(con => con.name == count).cities;
    console.log(statename);
    this.adminService.getAllDivision(statename)
      .subscribe(
        data => {
          this.divisionList = data;
        },
        error => {
          this.alertService.error(['Record Not Found, Please Contact to Admin', '', error]);
        });
  }
  changeDivision(divisionname) {
    // this.cities = this.countryList.find(con => con.name == count).cities;
    console.log(divisionname);
    this.adminService.getAllDistrict(divisionname)
      .subscribe(
        data => {
          this.districtList = data;
        },
        error => {
          this.alertService.error(['Record Not Found, Please Contact to Admin', '', error]);

        });
  }
  changeDistrict(districtname) {
    debugger;
    // this.cities = this.countryList.find(con => con.name == count).cities;
    console.log(districtname);
    this.adminService.getAllTehsils(districtname)
      .subscribe(
        data => {
          this.tehsilsList = data;
          console.log(data);

        },
        error => {
          this.alertService.error(['Record Not Found, Please Contact to Admin', '', error]);

        });
  }
  changeTehsils(tehsilsname) {
    debugger;
    // this.cities = this.countryList.find(con => con.name == count).cities;
    console.log(tehsilsname);
    this.adminService.getAllGramPanchayat(tehsilsname)
      .subscribe(
        data => {
          this.grampanchayatList = data;
          console.log(data);

        },
        error => {
          console.log(error);

        });
  }
  getAllState() {
    debugger
    this.adminService.getAllStates()
      //  .pipe(first())
      .subscribe(
        data => {
          this.stateList = data;
        },
        error => {
          debugger
          this.alertService.error(error);
          //  this.loading = false;
        });
  }
  getDivisionByState(params) {
    this.adminService.getAllStates()
      //  .pipe(first())
      .subscribe(
        data => {
          this.divisionList = data;
        },
        error => {
          debugger
          this.alertService.error(error);
          //  this.loading = false;
        });
  }
  onSubmit() {
    debugger
    // stop here if form is invalid
    if (this.registerVillageForm.invalid) {
      return;
    };
    this.userService.updateGramPanchayat(this.localUserData._id, this.registerVillageForm.value)
      //  .pipe(first())
      .subscribe(
        data => {
          // this.registerVillageForm.value.id = this.localUserData.length ? Math.max(...this.localUserData.map(x => x.id)) + 1 : 1;
          // this.localUserData.push(this.registerVillageForm.value);
          this.localUserData.userState= this.registerVillageForm.value.userState
          this.localUserData.userDivision= this.registerVillageForm.value.userDivision
          this.localUserData.userDistrict= this.registerVillageForm.value.userDistrict;
          this.localUserData.userZone= this.registerVillageForm.value.userZone;
          this.localUserData.userGrampanchayat= this.registerVillageForm.value.userGrampanchayat;
          localStorage.setItem('smartvillageusers', JSON.stringify(this.localUserData));
          this.alertService.success('State Registration successful', true);
          this.router.navigate(['/home']);
        },
        error => {
          debugger
          this.alertService.error(error);
          //  this.loading = false;
        });
  }

  setFormControlValues(state: string) {
    debugger
    this.registerVillageForm.get('userState').setValue(state, { onlySelf: true });
    //  this.registerVillageForm.get('subArea').setValue(subarea);
    // this.intrestAreaForm.get('track').setValue(track);
  }
}
