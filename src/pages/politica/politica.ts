import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@IonicPage()
@Component({
  selector: 'page-politica',
  templateUrl: 'politica.html',
})
export class PoliticaPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public inAppBrowser: InAppBrowser) {
  }

  abrirLink() {
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    const browser = this.inAppBrowser.create('http://www.acimmaraba.com.br/?page_id=4714', '_system', options);
  }
}
