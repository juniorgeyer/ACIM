import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class CadastroagendaProvider {
  private PATH = 'agenda/';
  private noticias = [];

  constructor(  private db: AngularFireDatabase,
    private afs: AngularFirestore) {
  }

  getAll(){

    return this.afs.collection(this.PATH, ref => ref.orderBy('data')  )
    .snapshotChanges().map(changes => {
      return changes.map(c => {
        const data = c.payload.doc.data() as any;
        data.key = c.payload.doc.id;
        return data;
      });
   });

   }

  get(key:string){
    var data:any = "";
    return this.db.object(this.PATH+ key)
    .snapshotChanges()
    //.orderByChild('texto')
    .map(c=> {
      return { key: c.key, ...c.payload.val()};
    })
   }

  save(agenda:any){
      return new Promise((resolve,reject) =>{

          var dividir_crit = agenda.data.split("-");

          var ano = dividir_crit[0];
          var dia = dividir_crit[2];
          var mes = dividir_crit[1];
          var nomeMes: string;
          if(mes=="01"){
          var horario = dia+ " de "+ "Janeiro"+ " de " + ano;
          nomeMes = "Janeiro";
          }
          else if(mes=="02"){
          var horario = dia+ " de "+ "Fevereiro"+ " de " + ano;
          nomeMes = "Fevereiro";
        }else if(mes=="03"){
          var horario = dia+ " de "+ "Março"+ " de " + ano;
          nomeMes = "Março";
        }else if(mes=="04"){
          var horario = dia+ " de "+ "Abril"+ " de " + ano;
          nomeMes = "Abril";
        }else if(mes=="05"){
          var horario = dia+ " de "+ "Maio"+ " de " + ano;
          nomeMes = "Maio";
        }else if(mes=="06"){
          var horario = dia+ " de "+ "Junho"+ " de " + ano;
          nomeMes = "Junho";
        }else if(mes=="07"){
          var horario = dia+ " de "+ "Julho"+ " de " + ano;
          nomeMes = "Julho";
        }else if(mes=="08"){
          var horario = dia+ " de "+ "Agosto"+ " de " + ano;
          nomeMes = "Agosto";
        }else if(mes=="09"){
          var horario = dia+ " de "+ "Setembro"+ " de " + ano;
          nomeMes = "Setembro";
        }else if(mes=="10"){
          var horario = dia+ " de "+ "Outubro"+ " de " + ano;
          nomeMes = "Outubro";
        }else if(mes=="11"){
          var horario = dia+ " de "+ "Novembro"+ " de " + ano;
          nomeMes = "Novembro";
        }else if(mes=="12"){
          var horario = dia+ " de "+ "Dezembro"+ " de " + ano;
          nomeMes = "Dezembro";
        }


          this.afs.doc<any>(this.PATH+agenda.titulo)
          .set({
            titulo: agenda.titulo,
            imagem: agenda.imagem,
            descricao: agenda.descricao,
            data: horario,
            localizacao: agenda.localizacao,
            horario: agenda.horario,
            valor: agenda.valor,
            ano: ano,
            dia: dia,
            mes: mes,
            nomeMes: nomeMes

          });
        });
  }

  remove (key: string){
      return this.afs.collection(this.PATH).doc(key).delete();
  }
}
