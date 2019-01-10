import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadastronoticiaProvider} from './../../providers/cadastronoticia/cadastronoticia';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-modalnoticias',
  templateUrl: 'modalnoticias.html',
})
export class ModalnoticiasPage {
  contacts: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,private provider: CadastronoticiaProvider) {
    this.crit = navParams.get('title');
    this.contacts= this.provider.get(this.crit);
    console.log(this.contacts.autor);
    this.setupPageTitle();
  }

  private setupPageTitle() {
    this.title = this.crit;
  }
  fechar(){
    this.navCtrl.pop();
  }


}
