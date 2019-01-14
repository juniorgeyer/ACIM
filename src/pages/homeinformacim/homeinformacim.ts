import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { NovanoticiaPage } from '../novanoticia/novanoticia';

import { CadastronoticiaProvider} from './../../providers/cadastronoticia/cadastronoticia';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';

import { ModalController } from 'ionic-angular';
import { ModalnoticiasPage } from '../modalnoticias/modalnoticias';
import { AngularFirestore } from 'angularfire2/firestore';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
* Generated class for the HomeinformacimPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({

  selector: 'page-homeinformacim',
  templateUrl: 'homeinformacim.html'
})
export class HomeinformacimPage {
  contacts:any;
  items = [];

  posts: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private provider: CadastronoticiaProvider, private toast: ToastController, private af: AngularFireDatabase,
    public modalCtrl: ModalController,
    private db: AngularFirestore,
    private socialSharing: SocialSharing
) {
      db.firestore.settings({ timestampsInSnapshots: true });
      this.contacts = this.provider.getAll();
      console.log(this.contacts);
    }

    whatsappShare(contact){
        this.socialSharing.shareViaWhatsApp(contact.titulo, "data:image/png;base64,R0lGODlhDAAMALMBAP8AAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUKAAEALAAAAAAMAAwAQAQZMMhJK7iY4p3nlZ8XgmNlnibXdVqolmhcRQA7" , "Venha e baixe o aplicativo ACIM! link...")
          .then(()=>{
            console.log("WhatsApp share successful");
          }).catch((err)=> {
          console.log("An error occurred ", err);
        });
      }

    presentModal(dados) {
      console.log(dados);
      const modal = this.modalCtrl.create('ModalnoticiasPage',{"noticia":dados});
      modal.present();
    }

    newNoticia(){
      this.navCtrl.push('NovanoticiaPage');
    }

    editContact(contact:any){
      this.navCtrl.push('NovanoticiaPage', { contact: contact});
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
