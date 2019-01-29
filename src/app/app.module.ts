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
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { SocialSharing } from '@ionic-native/social-sharing';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CadastronoticiaProvider } from '../providers/cadastronoticia/cadastronoticia';
import { NovanoticiaPage } from '../pages/novanoticia/novanoticia';
import { NovaagendaPage } from '../pages/novaagenda/novaagenda';

import { AgendacimPage } from '../pages/agendacim/agendacim';
import { FcmProvider } from '../providers/fcm/fcm';
import { Firebase } from '@ionic-native/firebase';
import { CadastroagendaProvider } from '../providers/cadastroagenda/cadastroagenda';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    TabsPage,
    HomeinformacimPage,
    NovanoticiaPage,
    AgendacimPage
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

    AngularFireDatabaseModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    TabsPage,
    HomeinformacimPage,
    NovanoticiaPage,
    AgendacimPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CadastronoticiaProvider,
    FcmProvider,
    Firebase,
    Camera,
    CadastroagendaProvider
  ]
})
export class AppModule {}
