import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { CadastronoticiaProvider } from './../../providers/cadastronoticia/cadastronoticia';
import 'rxjs/add/operator/map';
import { AngularFirestore } from 'angularfire2/firestore';
import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@IonicPage()
@Component({
  selector: 'page-modalcurso',
  templateUrl: 'modalcurso.html',
})
export class ModalcursoPage {
  curso: any;
  titulo: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private provider: CadastronoticiaProvider,
    public viewCtrl: ViewController,
    private socialSharing: SocialSharing,
    public platform: Platform,
    private db: AngularFirestore,
    public inAppBrowser: InAppBrowser) {
    db.firestore.settings({ timestampsInSnapshots: true });
    this.curso = navParams.get('curso');
  }

  fechar() {
    this.navCtrl.pop();
  }

  closemodal() {
    this.viewCtrl.dismiss();
  }

  deletarNoticia(key) {
    this.provider.remove(key);
  }

  abrirLink() {
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    const browser = this.inAppBrowser.create(this.curso.link, '_system', options);
  }

  whatsappShare(contact) {
    this.socialSharing.shareViaWhatsApp(contact.titulo, contact.imagem, ". Venha e baixe o aplicativo ACIM! Link --> https://play.google.com/store/apps/details?id=ctech.acim")
      .then(() => {
      }).catch((err) => {
      });
  }
}

