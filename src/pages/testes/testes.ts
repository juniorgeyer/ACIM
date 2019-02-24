import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import moment from 'moment';
import { AngularFirestore } from 'angularfire2/firestore';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CadastroagendaProvider } from '../../providers/cadastroagenda/cadastroagenda';

@IonicPage()
@Component({
  selector: 'page-testes',
  templateUrl: 'testes.html',
})
export class TestesPage {

  imagem: any
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder, 
    private provider: CadastroagendaProvider,
    private toast: ToastController,
    private db: AngularFirestore,
    private camera: Camera) {
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
      this.imagem = 'data:image/jpeg;base64,'+imageData;
    },(err) =>{
      console.log(err);
    });
  }

  /*submit(){
    this.provider.saveTeste(this.imagem)
    .then(res=>{
      var converteResposta = String(res);
      var divideResposta = converteResposta.split(".");
      if(divideResposta[0] == 'FirebaseError: [code=invalid-argument]: The value of property "imagem" is longer than 1048487 bytes'){
        this.toast.create({message: 'A imagem escolhida é muito grande!', duration:3000}).present();
      }
    });
  }*/
}
