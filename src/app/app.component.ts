import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';

import { FcmProvider } from '../providers/fcm/fcm';

import { ToastController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { HomeinformacimPage } from '../pages/homeinformacim/homeinformacim';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private fcm: FcmProvider,
    private toastCtrl: ToastController,
    private db: AngularFirestore) {
      db.firestore.settings({ timestampsInSnapshots: true });
      this.platform.ready().then(() => {

        // Get a FCM token

      /*  this.fcm.getToken()

        // Listen to incoming messages
        this.fcm.listenToNotifications().pipe(
          tap(msg => {
            // show a toast
            const toast = this.toastCtrl.create({
              message: msg.body,
              duration: 3000
            });
            toast.present();
          })
        )
        .subscribe() */

  this.statusBar.styleDefault();
  this.splashScreen.hide();
});

    // used for an example of ngFor and navigation
    /*this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];*/

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
