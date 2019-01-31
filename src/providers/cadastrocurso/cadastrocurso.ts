import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class CadastrocursoProvider {
  private PATH = 'cursos/';
  private noticias = [];

  constructor(
    private db: AngularFireDatabase,
    private afs: AngularFirestore) {
  }

  /*
  * Função para retornar todos os cursos cadastrados
  */
  getAll() {
    return this.afs.collection(this.PATH, ref => ref.orderBy('data'))
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
    var data: any = "";
    return this.db.object(this.PATH + key)
      .snapshotChanges()
      //.orderByChild('texto')
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      })
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

      console.log(mes);
      if (mes == "01") {
        var horario = dia + " de " + "Janeiro" + " de " + ano;
      }
      else if (mes == "02") {
        var horario = dia + " de " + "Fevereiro" + " de " + ano;
      } else if (mes == "03") {
        var horario = dia + " de " + "Março" + " de " + ano;
      } else if (mes == "04") {
        var horario = dia + " de " + "Abril" + " de " + ano;
      } else if (mes == "05") {
        var horario = dia + " de " + "Maio" + " de " + ano;
      } else if (mes == "06") {
        var horario = dia + " de " + "Junho" + " de " + ano;
      } else if (mes == "07") {
        var horario = dia + " de " + "Julho" + " de " + ano;
      } else if (mes == "08") {
        var horario = dia + " de " + "Agosto" + " de " + ano;
      } else if (mes == "09") {
        var horario = dia + " de " + "Setembro" + " de " + ano;
      } else if (mes == "10") {
        var horario = dia + " de " + "Outubro" + " de " + ano;
      } else if (mes == "11") {
        var horario = dia + " de " + "Novembro" + " de " + ano;
      } else if (mes == "12") {
        var horario = dia + " de " + "Dezembro" + " de " + ano;
      }


      this.afs.doc<any>(this.PATH + curso.titulo)
        .set({
          titulo: curso.titulo,
          imagem: curso.imagem,
          descricao: curso.descricao,
          data: horario,
          textoNotificacao: curso.textoNotificacao,
          ministrante: curso.ministrante,
          localizacao: curso.localizacao,
          horario: curso.horario,
          valor: curso.valor,
          dia: dia,
          mes: mes
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
