import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CadastronoticiaProvider} from './../../providers/cadastronoticia/cadastronoticia';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import moment from 'moment';
import { AngularFirestore } from 'angularfire2/firestore';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
* Generated class for the NovanoticiaPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-novanoticia',
  templateUrl: 'novanoticia.html',
})
export class NovanoticiaPage {
  
  title: string;
  form: FormGroup;
  contact:any;
  base64Image: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder, 
    private provider: CadastronoticiaProvider,
    private toast: ToastController,
    private db: AngularFirestore,
    private camera: Camera) {
      db.firestore.settings({ timestampsInSnapshots: true });
      this.contact = this.navParams.data.contact || {};
      this.setupPageTitle();
      this.createForm();

    }

    private setupPageTitle() {
      this.title = this.navParams.data.contact? 'Alterando notícia': 'Nova Notícia';
    }

    createForm(){

      this.form = this.formBuilder.group({
        key: [this.contact.key],
        titulo: [this.contact.titulo, Validators.required],
        textoCompleto: [this.contact.textoCompleto],
        autor: [this.contact.autor],
        horario: [this.contact.horario],
        imagem: [this.contact.imagem],
        link: [this.contact.link]
      });

    }

      onSubmit(){
                  
      if(this.form.valid){
        this.provider.save(this.form.value)
        .then(res => {
          if (res == "ok") {
            this.toast.create({ message: 'Notícia adicionada com sucesso.', duration: 3000 }).present();
            this.form.reset();
            this.contact.imagem = '';
            this.navCtrl.pop();
          } else {
            var converteResposta = String(res);
            var divideResposta = converteResposta.split(".");

            if (divideResposta[0] == 'FirebaseError: [code=invalid-argument]: The value of property "imagem" is longer than 1048487 bytes') {
              this.toast.create({ message: 'A imagem escolhida é muito grande!', duration: 3000 }).present();
            } else {
              this.toast.create({ message: 'Falha ao adicionar.', duration: 3000 }).present();
            }
          }
        })
      }
    }

    
  openGallery(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) =>{
      this.contact.imagem = 'data:image/jpeg;base64,'+imageData;
      console.log(this.contact.imagem);
    },(err) =>{
      console.log(err);
    });
  }
  }
