import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { CadastronoticiaProvider} from './../../providers/cadastronoticia/cadastronoticia';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';

import { ModalController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NovocursoPage } from '../novocurso/novocurso';
import { CadastrocursoProvider } from '../../providers/cadastrocurso/cadastrocurso';
import { ModalcursoPage } from '../modalcurso/modalcurso';


@IonicPage()
@Component({
  selector: 'page-capacitacim',
  templateUrl: 'capacitacim.html',
})
export class CapacitacimPage {
  cursos:any;
  items = [];
  vazio = false;
  posts: Observable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private provider: CadastrocursoProvider,
    private toast: ToastController,
    private af: AngularFireDatabase,
    public modalCtrl: ModalController,
    private db: AngularFirestore,
    private socialSharing: SocialSharing
) {
      db.firestore.settings({ timestampsInSnapshots: true });
      this.cursos = this.provider.getAll();

      this.cursos.subscribe(result =>{
        if(result.length == 0){
          this.vazio = true;
        }else{
          this.vazio = false;
        }
      });

    }

    whatsappShare(contact){
        this.socialSharing.shareViaWhatsApp(contact.titulo, contact.imagem, ". Baixe o aplicativo ACIM em https://play.google.com/store/apps/details?id=ctech.acim")
          .then(()=>{
          }).catch((err)=> {
        });
      } 

    presentModal(curso) {
      const modal = this.modalCtrl.create('ModalcursoPage',{curso:curso});
      modal.present();
    }

    novoCurso(){
      this.navCtrl.push(NovocursoPage);
    }

    editContact(curso:any){
      this.navCtrl.push('ModalcursoPage', { curso: curso});
    }

    removeContact(key: string){
      this.provider.remove(key)
      .then(() => {
        this.toast.create({message: 'Noticia removida com sucesso.', duration:3000}).present();
      })
      .catch((e) => {
        this.toast.create({message: 'Erro ao remover.', duration:3000}).present();

      })
    } 
}
