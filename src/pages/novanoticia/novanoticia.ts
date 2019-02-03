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
        texto: [this.contact.texto, Validators.required],
        textoCompleto: [this.contact.textoCompleto],
        autor: [this.contact.autor],
        horario: [this.contact.horario],
        imagem: [this.contact.imagem]
      });

    }

      onSubmit(){
                  
      if(this.form.valid){
        this.provider.save(this.form.value)
        .then(()=>{
          //this.toast.create({message: 'Noticia adicionada com sucesso.', duration:3000}).present();
          this.navCtrl.pop();
        })
        .catch((e)=>{
          //this.toast.create({message: 'Falha ao adicionar.', duration:3000}).present();
          console.error(e);
        });
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
