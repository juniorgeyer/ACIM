import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { LocalNotifications } from '@ionic-native/local-notifications/';
declare var google;


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
    var dataAtual = new Date();
    var dataString = String(dataAtual);
    var dataSplit = dataString.split(":");
    var idParcial = dataSplit[1]+dataSplit[2];
    var idParcialSplit = idParcial.split(" ");
    var id = +idParcialSplit[0];    

    var dataEvento = new Date();
    
    dataEvento.setFullYear(+this.crit.ano);
    dataEvento.setMonth(+this.crit.mes-1);
    dataEvento.setDate(+this.crit.dia);
    dataEvento.setHours(8);
    dataEvento.setMinutes(20);
    dataEvento.setSeconds(0);

    this.localNotifications.schedule({
      id: id,
      title: "Evento Marcado Para Hoje",
      text: this.crit.titulo,
      trigger: {at: dataEvento}
    });
      let toast = this.toastCtrl.create({
        message: 'Você Será Notificado No Dia Do Evento',
        duration: 3000
      });
      toast.present();
  }
}