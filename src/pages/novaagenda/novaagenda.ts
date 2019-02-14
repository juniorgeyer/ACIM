import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CadastroagendaProvider} from './../../providers/cadastroagenda/cadastroagenda';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import moment from 'moment';
import { AngularFirestore } from 'angularfire2/firestore';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-novaagenda',
  templateUrl: 'novaagenda.html',
})
export class NovaagendaPage {
  title: string;
  form: FormGroup;
  agenda:any;
  base64Image: string = "";
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private provider: CadastroagendaProvider,
    private toast: ToastController,
    private db: AngularFirestore,
    private camera: Camera) {
      db.firestore.settings({ timestampsInSnapshots: true });
      this.agenda = this.navParams.data.agenda || {};
      this.setupPageTitle();
      this.createForm();
    }

    private setupPageTitle() {
      this.title = this.navParams.data.agenda? 'Alterando evento': 'Novo Evento';
    }

    createForm(){

      this.form = this.formBuilder.group({
        key: [this.agenda.key],
        titulo: [this.agenda.titulo, Validators.required],
        descricao: [this.agenda.descricao, Validators.required],
        data: [this.agenda.data, Validators.required],
        localizacao: [this.agenda.localizacao, Validators.required],
        valor: [this.agenda.valor, Validators.required],
        horario: [this.agenda.horario , Validators.required],
        imagem: [this.agenda.imagem]
      });

    }


      onSubmit(){

      if(this.form.valid){
        this.provider.save(this.form.value)
        .then(()=>{
          this.toast.create({message: 'Evento adicionado com sucesso.', duration:3000}).present();
          this.navCtrl.pop();
        })
        .catch((e)=>{
          this.toast.create({message: 'Falha ao adicionar.', duration:3000}).present();
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
      this.agenda.imagem = 'data:image/jpeg;base64,'+imageData;
      console.log(this.agenda.imagem);
    },(err) =>{
      console.log(err);
    });
  }
  }
