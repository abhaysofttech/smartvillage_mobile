import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../../_services';
import { AlertController } from '@ionic/angular';

@Component({ selector: 'alert', templateUrl: './alert.component.html', styleUrls: ['./alert.component.scss'] })
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;

  constructor(private alertService: AlertService,public alertController: AlertController) { }

  ngOnInit() {
    this.subscription = this.alertService.getAlert()
      .subscribe(message => {
        debugger
        switch (message && message.type) {
          case 'success':
            message.cssClass = 'alert alert-success';
            break;
          case 'error':
            message.cssClass = 'alert alert-danger';
            break;
        }

        this.message = message;
      });

      
  }
 
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
