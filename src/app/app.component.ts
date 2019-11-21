import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './_models';
import { Router } from '@angular/router';
import { NetworkService, AuthenticationService } from './_services';
import { debounceTime } from 'rxjs/operators';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Update Password',
      url: '/list',
      icon: 'open'
    },
    {
      title: 'Share App',
      url: '/list',
      icon: 'share'
    },
    {
      title: 'Rate App',
      url: '/list',
      icon: 'pulse'
    },
    {
      title: 'Contact Us',
      url: '/list',
      icon: 'contact'
    },
    {
      title: 'Logout',
      url: '/list',
      icon: 'log-out'
    }
  ];
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  isConnected: boolean;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private network: Network,
    private authenticationService: AuthenticationService

  ) {
    this.initializeApp();
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('smartvillageusers')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.networkSubscriber();
    });
  }

  logoutClicked() {
    this.authenticationService.logout();
  }

  networkSubscriber() {
    // this.networkService
    //     .getNetworkStatus()
    //     .pipe(debounceTime(300))
    //     .subscribe((connected: boolean) => {
    //         this.isConnected = connected;
    //         console.log('[Home] isConnected', this.isConnected);
    //        // this.handleNotConnected(connected);
    //     });

    // watch network for a disconnection
   this.network.onDisconnect().subscribe(() => {
      debugger
      console.log('network was disconnected :-(');
    });

    // stop disconnect watch
  //  disconnectSubscription.unsubscribe();


    // watch network for a connection
   this.network.onConnect().subscribe(() => {
      debugger
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });

    // stop connect watch
  //  connectSubscription.unsubscribe();
  }
}
