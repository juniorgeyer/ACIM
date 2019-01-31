import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CadastrocursoProvider } from '../../providers/cadastrocurso/cadastrocurso';


@IonicPage()
@Component({
  selector: 'page-novocurso',
  templateUrl: 'novocurso.html',
})
export class NovocursoPage {
  title: string;
  form: FormGroup;
  curso: any;
  base64Image: string = "";
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private provider: CadastrocursoProvider,
    private toast: ToastController,
    private db: AngularFirestore,
    private camera: Camera) {
    db.firestore.settings({ timestampsInSnapshots: true });
    this.curso = this.navParams.data.curso || {};
    this.createForm();
  }

  /*
  * Função para criar o formulário de cadastro
  */
  createForm() {
    this.form = this.formBuilder.group({
      key: [this.curso.key],
      titulo: [this.curso.titulo, Validators.required],
      descricao: [this.curso.descricao, Validators.required],
      textoNotificacao: [this.curso.textoNotificacao, Validators.required],
      ministrante: [this.curso.ministrante, Validators.required],
      data: [this.curso.data, Validators.required],
      localizacao: [this.curso.localizacao, Validators.required],
      valor: [this.curso.valor, Validators.required],
      horario: [this.curso.horario, Validators.required],
      imagem: [this.curso.imagem, Validators.required]
    });

  }

  /*
  * Função chamada pelo botão "Salvar" para realizar o cadastro das informações do novo curso no banco de dados.
  */
  onSubmit() {

    if (this.form.valid) {
      console.log(this.form.value);
      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Curso adicionado com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Falha ao adicionar.', duration: 3000 }).present();
          console.error(e);
        });
    }
  }

  /*
  * Função para abrir a galeria, selecionar uma imagem, converter essa imagem para string base64
  * e salvar esta string na variável curso.imagem para enviá-la ao banco
  */
  openGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      this.curso.imagem = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log("Erro");
    });
  }

}
