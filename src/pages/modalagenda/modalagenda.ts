import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.crit = navParams.get('title');
    console.log(this.crit);
    this.setupPageTitle();
  }

  private setupPageTitle() {
    this.title = this.crit;
  }
  fechar(){
    this.navCtrl.pop();
  }

}
