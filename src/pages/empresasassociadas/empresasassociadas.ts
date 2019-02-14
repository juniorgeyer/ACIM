import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidLoad() {
    this.load();

  }
  load() : void
   {
      this.http
      .get('https://www.acimmaraba.com.br/lerdados.php')
      .subscribe((data : any) =>
      {
         console.dir(data);
         this.items = data;
      },
      (error : any) =>
      {
         console.dir(error);
      });
   }
}
