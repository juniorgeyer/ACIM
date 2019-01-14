import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CadastronoticiaProvider} from './../../providers/cadastronoticia/cadastronoticia';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { SocialSharing } from "@ionic-native/social-sharing";

@IonicPage()
@Component({
  selector: 'page-modalnoticias',
  templateUrl: 'modalnoticias.html',
})
export class ModalnoticiasPage {
  contacts: Observable<any>;
  crit: any;
  title: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private provider: CadastronoticiaProvider,    public socialSharing: SocialSharing) {
    this.crit = navParams.get('title');
    this.contacts= this.provider.get(this.crit);
    console.log(this.contacts);
    this.setupPageTitle();
  }

  private setupPageTitle() {
    this.title = this.titulo;
  }
  fechar(){
    this.navCtrl.pop();
  }
  normalShare() {
    this.socialSharing.share("Compartilhando o conteúdo de um aplicativo com o Social Sharing.", null, "www/assets/images/ionic-logo.png", null);
}
whatsappShare() {
    this.socialSharing.shareViaWhatsApp("Compartilhando o conteúdo de um aplicativo com o Social Sharing.", "www/assets/images/ionic-logo.png", null);
}
facebookShare() {
    this.socialSharing.shareViaFacebook("Compartilhando o conteúdo de um aplicativo com o Social Sharing.", "www/assets/images/ionic-logo.png", null);
}

  deletarNoticia(key){
    this.provider.remove(key);
  }
}
