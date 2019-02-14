import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { LocalNotifications } from '@ionic-native/local-notifications/';
declare var google;

/**
 * Generated class for the ModalagendaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modalagenda',
  templateUrl: 'modalagenda.html',
})
export class ModalagendaPage {
public crit;
title: string;
 

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFirestore,
    private localNotifications: LocalNotifications,
    private toastCtrl: ToastController) {
    db.firestore.settings({ timestampsInSnapshots: true });
    this.crit = navParams.get('title');
    this.setupPageTitle();
  }

  private setupPageTitle() {
    this.title = this.crit;
  }
  fechar(){
    this.navCtrl.pop();
  }

  salvaNotificacao(){
    var id = Math.floor(Math.random() * 65536);
    var data = new Date();
    data.setFullYear(this.crit.ano);
    data.setMonth(+this.crit.mes-1);
    data.setDate(this.crit.dia);
    data.setHours(15);
    data.setMinutes(40);
    data.setSeconds(0);

    this.localNotifications.schedule({
      id: id,
      title: "Evento Marcado Para Hoje",
      text: this.crit.titulo,
      trigger: {at: data}
    });
    console.log(data);
      let toast = this.toastCtrl.create({
        message: 'Você Será Notificado No Dia Do Evento',
        duration: 3000
      });
      toast.present();
  }
}
