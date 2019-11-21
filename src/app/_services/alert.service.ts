import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterRouteChange = false;

    constructor(private router: Router, public alertController: AlertController) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    // clear alert message
                    this.clear();
                }
            }
        });
    }
    async presentAlert(message: any) {
        const alert = await this.alertController.create({
            backdropDismiss: false,
            header: message[0],
            subHeader: message[1],
            message: message[2],
            buttons: [message[3]]
        });

        await alert.present();
    }
    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    success(message: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ type: 'success', text: message });
    }

    async error(message: any, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        // this.subject.next({ type: 'error', text: message });
        const alert = await this.alertController.create({
            backdropDismiss: false,
            header: message[0],
            subHeader: message[1],
            message: message[2],
            buttons: ['OK']
        });

        await alert.present();
    }

    clear() {
        // clear by calling subject.next() without parameters
        this.subject.next();
    }
}