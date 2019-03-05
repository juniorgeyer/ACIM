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

      objetivo: [this.curso.objetivo, Validators.required],
      facilitador: [this.curso.facilitador, Validators.required],

      data: [this.curso.data, Validators.required],
      localizacao: [this.curso.localizacao, Validators.required],
      valormeiassociado: [this.curso.valorvalormeiassociado],
      valormeianaossociado: [this.curso.valorvalormeiassociado],
      valorempresaassociada: [this.curso.valorvalormeiassociado],
      valorempresanaoassociada: [this.curso.valorvalormeiassociado],
      valorpessoafisica: [this.curso.valorpessoafisica],
      horario: [this.curso.horario],
      link: [this.curso.horario],
      imagem: [this.curso.imagem],
      resumoProfissional: [this.curso.resumoProfissional],

      publicoAlvo: [this.curso.publicoAlvo],
      temasAbordados: [this.curso.temasAbordados],
      cargaHoraria: [this.curso.cargaHoraria]
    });
  }

  /*
  * Função chamada pelo botão "Salvar" para realizar o cadastro das informações do novo curso no banco de dados.
  */
  onSubmit() {

    if (this.form.valid) {
      this.provider.save(this.form.value)
      .then(res => {
        if (res == "ok") {
          this.toast.create({ message: 'Curso adicionado com sucesso.', duration: 3000 }).present();
          this.form.reset();
          this.curso.imagem = '';
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

  limpaCampos(){

  }

}
