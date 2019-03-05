import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform, ViewController } from 'ionic-angular';
import { CadastronoticiaProvider} from './../../providers/cadastronoticia/cadastronoticia';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { AngularFirestore } from 'angularfire2/firestore';
import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';


@IonicPage()
@Component({
  selector: 'page-modalnoticias',
  templateUrl: 'modalnoticias.html',
})
export class ModalnoticiasPage {
  contacts: any;
  titulo: string;
  title: any;

  public message  : string = 'Take your app development skills to the next level with Mastering Ionic - the definitive guide';
   public image    : string	= 'http://masteringionic2.com/perch/resources/mastering-ionic-2-cover-1-w320.png';
   public uri      : string	= 'http://masteringionic2.com/products/product-detail/s/mastering-ionic-2-e-book';


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private provider: CadastronoticiaProvider,
    public viewCtrl: ViewController,
    private socialSharing: SocialSharing,
    public platform   : Platform,
    private db: AngularFirestore,
    public inAppBrowser: InAppBrowser) {
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


  whatsappShare(contact){
      this.socialSharing.shareViaWhatsApp(contact.textoCompleto,  contact.imagem , "Baixe o aplicativo ACIM em https://play.google.com/store/apps/details?id=ctech.acim")
        .then(()=>{
        }).catch((err)=> {
      });
    }

    
  abrirLink() {
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    const browser = this.inAppBrowser.create(this.contacts.link, '_system', options);
  }

   //facebookShare(contact){
  //  this.socialSharing.shareViaFacebook(null, null , "null");
  //}

  facebookShare()
   {
      this.platform.ready()
      .then(() =>
      {
         this.socialSharing.canShareVia('com.apple.social.facebook', this.message, this.image, this.uri)
         .then((data) =>
         {

          this.socialSharing.shareViaFacebook(this.message, this.image, this.uri)
            .then((data) =>
            {
               console.log('Shared via Facebook');
            })
            .catch((err) =>
            {
               console.log('Was not shared via Facebook');
            });

         })
         .catch((err) =>
         {
            console.log('Not able to be shared via Facebook');
         });

      });
   }


  closemodal() {
    this.viewCtrl.dismiss();
  }

  deletarNoticia(key){
    this.provider.remove(key);
  }
}
