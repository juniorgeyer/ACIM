import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the EmpresasassociadasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-empresasassociadas',
  templateUrl: 'empresasassociadas.html',
})
export class EmpresasassociadasPage {
  public items : Array<any> = [];
  users: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient,
                public service: ServiceProvider) {
  }

  ionViewDidLoad() {
    this.load();
  }

  load() {
     this.service.getData().subscribe(
          data => this.users = data,
          err => console.log(err)
       );

   }


}
