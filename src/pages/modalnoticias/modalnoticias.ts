import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CadastronoticiaProvider} from './../../providers/cadastronoticia/cadastronoticia';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { AngularFirestore } from 'angularfire2/firestore';

@IonicPage()
@Component({
  selector: 'page-modalnoticias',
  templateUrl: 'modalnoticias.html',
})
export class ModalnoticiasPage {
  contacts: any;
  titulo: string;
  title: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private provider: CadastronoticiaProvider,
    public viewCtrl: ViewController,
    private db: AngularFirestore) {
    db.firestore.settings({ timestampsInSnapshots: true });
    this.contacts = navParams.get('noticia');
    this.titulo = this.contacts.titulo;
    this.setupPageTitle();
  }

  private setupPageTitle() {
    this.title = this.titulo;
  }
  fechar(){
    this.navCtrl.pop();
  }

  closemodal() {
    this.viewCtrl.dismiss();
  }

  deletarNoticia(key){
    this.provider.remove(key);
  }
}
