import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeinformacimPage } from '../homeinformacim/homeinformacim';
import { NovanoticiaPage } from '../novanoticia/novanoticia';
import { AgendacimPage } from '../agendacim/agendacim';
import { CapacitacimPage } from '../capacitacim/capacitacim';
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  templateUrl: 'tabs.html',

})
export class TabsPage {
    tab1Root = HomeinformacimPage;
    tab2Root = CapacitacimPage;
    tab3Root = HomeinformacimPage;
    tab4Root = AgendacimPage;
    myIndex: number;

  constructor(
    public navParams: NavParams
  ) {
    this.navParams.get('selectedTab') != undefined ? this.myIndex = this.navParams.get('selectedTab') : this.myIndex = 0;
  }
}
