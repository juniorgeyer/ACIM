import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ToastController } from 'ionic-angular';

@Injectable()
export class CadastrocursoProvider {
  private PATH = 'cursos/';
  private noticias = [];

  constructor(
    private db: AngularFireDatabase,
    private afs: AngularFirestore,
    private toast: ToastController,
    ) {
  }

  /*
  * Função para retornar todos os cursos cadastrados
  */
  getAll() {
    return this.afs.collection(this.PATH, ref => ref.orderBy('ordenacao'))
      .snapshotChanges().map(changes => {
        return changes.map(c => {
          const data = c.payload.doc.data() as any;
          data.key = c.payload.doc.id;
          return data;
        });
      });

  }

  /*
  * Função para retornar um curso cadastrado (o curso a ser retornado será passado em "key")
  */
  get(key: string) {
    return this.afs.collection("cursos").doc(key).ref.get();
  }

  /*
  * Função para salvar um curso no Banco de dados. Todos os detalhes do curso são passados através
  * do objeto curso
  */
  save(curso: any) {
    return new Promise((resolve, reject) => {

      var dividir_crit = curso.data.split("-");

      var ano = dividir_crit[0];
      var dia = dividir_crit[2];
      var mes = dividir_crit[1];

      var ordenacao = ano+mes+dia;

      var meses = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
      ];

      mes = +mes;
      mes = meses[mes-1];

      var horario = dia + " de " + mes + " de " + ano;

      this.afs.doc<any>(this.PATH + curso.titulo)
        .set({
          titulo: curso.titulo,
          imagem: curso.imagem,
          objetivo: curso.objetivo,
          data: horario,
          facilitador: curso.facilitador,
          resumoProfissional: curso.resumoProfissional,
          localizacao: curso.localizacao,
          horario: curso.horario,
          link: curso.link,
          valormeiassociado: curso.valormeiassociado,
          valormeianaossociado: curso.valormeianaossociado,
          valorempresaassociada: curso.valorempresaassociada,
          valorempresanaoassociada: curso.valorempresanaoassociada,
          valorpessoafisica: curso.valorpessoafisica,
          dia: dia,
          mes: mes,
          ordenacao: ordenacao,
          publicoAlvo: curso.publicoAlvo,
          temasAbordados: curso.temasAbordados,
          cargaHoraria: curso.cargaHoraria
        }).then(res =>{
          resolve("ok");
        })
        .catch(res=>{
          resolve(res);
        });
    });
  }

  /*
  * Função para deletar um curso do banco
  */
  remove(key: string) {
    return this.afs.collection(this.PATH).doc(key).delete();
  }
}
