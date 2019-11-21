import { Component, OnInit } from '@angular/core';
import { ComplainService } from 'src/app/_services';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.scss'],
})
export class ComplaintComponent implements OnInit {
  complainRegType : any;
  subcomplainType : any;
  constructor(
    private complainService: ComplainService,
  ) { }

  ngOnInit() {

    this.complainService.getcomplainname()
    .subscribe(
        data => {
          this.complainRegType = data;
          console.log(data);
         // this.changecomplainType(this.complainType[0].complainname);
        },
        error => {
          console.log(error);
            
        });
  }


}
