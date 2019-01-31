import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ModalagendaPage } from '../modalagenda/modalagenda';
import { NovaagendaPage } from '../novaagenda/novaagenda';
import { CadastroagendaProvider } from '../../providers/cadastroagenda/cadastroagenda';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';

/**
 * Generated class for the AgendacimPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agendacim',
  templateUrl: 'agendacim.html',
})
export class AgendacimPage {
  contacts:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private af: AngularFireDatabase,
    public modalCtrl: ModalController,
    private db: AngularFirestore,
    private provider: CadastroagendaProvider)
    {
      db.firestore.settings({ timestampsInSnapshots: true });
      this.contacts = this.provider.getAll();
      console.log(this.contacts);
  }

  presentModal(dados) {
    console.log(dados);
     const modal = this.modalCtrl.create('ModalagendaPage',{title:dados});
     modal.present();
   }

   newNoticia(){
     this.navCtrl.push(NovaagendaPage);

   }
}