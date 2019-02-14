import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
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
import { AgendacimPage } from '../pages/agendacim/agendacim';
import { CadastronoticiaProvider } from '../providers/cadastronoticia/cadastronoticia';
import { ModalnoticiasPage } from '../pages/modalnoticias/modalnoticias';
import { CadastrocursoProvider } from '../providers/cadastrocurso/cadastrocurso';
import { ModalcursoPage } from '../pages/modalcurso/modalcurso';
import { QuemsomosPage } from '../pages/quemsomos/quemsomos';
import { CapacitacimPage } from '../pages/capacitacim/capacitacim';
import { EmpresasassociadasPage } from '../pages/empresasassociadas/empresasassociadas';


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
    private db: AngularFirestore,
    private provider: CadastronoticiaProvider,
    private providerCursos: CadastrocursoProvider,
    public modalCtrl: ModalController
  ) {
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
        .subscribe()*/

        
        this.fcm.getToken()
        this.fcm.listenToNotifications().pipe(
        tap(data => {
          if(data.tap == true){
            if (data.acao == "novaNoticia") {
              this.provider.get(data.titulo).then(dados=>{
                const modal = this.modalCtrl.create('ModalnoticiasPage',{"noticia":dados.data()});
                modal.present();
              });
            }else if(data.acao == "novoCurso"){
              this.providerCursos.get(data.titulo).then(dados=>{
                const modal = this.modalCtrl.create('ModalcursoPage',{"curso":dados.data()});
                modal.present();
              });
            }
            //this.tipoNotificacao.create(data.title)
            //this.nav.push(TabsPage, {selectedTab: paginaNotificacao});
          }
      })
      )
      .subscribe()


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

  chamaAgendAcim(selectedTab){
    this.nav.push(TabsPage, {selectedTab:selectedTab});
  }
  chamaInformAcim(selectedTab){
    this.nav.push(HomeinformacimPage, {selectedTab:selectedTab});
  }
  chamaCapacitAcim(selectedTab){
    this.nav.push(CapacitacimPage, {selectedTab:selectedTab});
  }

  chamaQuemSomos(selectedTab){
    this.nav.push(QuemsomosPage, {selectedTab:selectedTab});
  }
  chamaEmpresas(selectedTab){
    this.nav.push(EmpresasassociadasPage, {selectedTab:selectedTab});
  }
}
