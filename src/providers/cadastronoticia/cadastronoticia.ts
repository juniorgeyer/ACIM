import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class CadastronoticiaProvider {
    private PATH = 'noticias/';
    private noticias = [];

  constructor(
    private db: AngularFireDatabase,
    private afs: AngularFirestore
  ) {}

  getAll(){

    /*return this.db.list(this.PATH, ref => ref.orderByChild('horario'))
    .snapshotChanges()
    .map(changes => {
       return changes.map(c => ({
         key: c.payload.key, ...c.payload.val()
       }))
    })*/
    return this.afs.collection(this.PATH, ref => ref.orderBy('horario')  )
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
    /*return this.db.object(this.PATH+ key)
    .snapshotChanges()
    //.orderByChild('texto')
    .map(c=> {
      return { key: c.key, ...c.payload.val()};
    })*/
   }

  save(contact:any){
      return new Promise((resolve,reject) =>{
        /*if (contact.key){
              this.db.list(this.PATH)
              .update(contact.key, {  titulo: contact.titulo,
                                      imagem: contact.imagem,
                                      texto: contact.texto,
                                      autor: contact.autor,
                                      horario: contact.horario})
              .then(()=> resolve())
              .catch((e)=> reject(e));
              }

        else{          
          this.db.list(this.PATH)
          .push({ titulo: contact.titulo,
                  imagem: contact.imagem,
                  texto: contact.texto,
                  autor: contact.autor,
                  horario: contact.horario})
          .then(()=> resolve());*/

          this.afs.doc<any>(this.PATH+contact.titulo)
          .set({
            titulo: contact.titulo,
            imagem: contact.imagem,
            texto: contact.texto,
            autor: contact.autor,
            horario: contact.horario
          });
        });
  }

  remove (key: string){
      return this.afs.collection(this.PATH).doc(key).delete();
  }
}
