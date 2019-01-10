import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ModalagendaPage } from '../modalagenda/modalagenda';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
  }

  presentModal(dados) {
    console.log(dados);
     const modal = this.modalCtrl.create('ModalagendaPage',{title:dados});
     modal.present();
   }
}
