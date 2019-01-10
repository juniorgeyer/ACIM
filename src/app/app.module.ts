import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { TabsPage } from '../pages/tabs/tabs';

import { HomeinformacimPage} from '../pages/homeinformacim/homeinformacim';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CadastronoticiaProvider } from '../providers/cadastronoticia/cadastronoticia';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    TabsPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
   apiKey: "AIzaSyCfAexNlYuNCCiseiRzrqiGv-RelNmN7Qc",
   authDomain: "acim-72c9b.firebaseapp.com",
   databaseURL: "https://acim-72c9b.firebaseio.com",
   projectId: "acim-72c9b",
   storageBucket: "acim-72c9b.appspot.com",
   messagingSenderId: "536686096736"
 }
    ),

    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    TabsPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CadastronoticiaProvider
  ]
})
export class AppModule {}
