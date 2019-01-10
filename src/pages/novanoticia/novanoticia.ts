import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CadastronoticiaProvider} from './../../providers/cadastronoticia/cadastronoticia';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import moment from 'moment';

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


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: CadastronoticiaProvider,
    private toast: ToastController) {

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
        imagem: [this.contact.imagem],
        texto: [this.contact.texto, Validators.required],
        autor: [this.contact.autor],
        horario: [this.contact.horario]

      });

    }


      onSubmit(){
                  
      if(this.form.valid){
        this.provider.save(this.form.value)
        .then(()=>{
          this.toast.create({message: 'Noticia adicionada com sucesso.', duration:3000}).present();
          this.navCtrl.pop();
        })
        .catch((e)=>{
          this.toast.create({message: 'Falha ao adicionar.', duration:3000}).present();
          console.error(e);
        });
      }
    }
  }
