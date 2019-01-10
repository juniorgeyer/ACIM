import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CadastronoticiaProvider {
    private PATH = 'noticias/';


  constructor(private db: AngularFireDatabase) {
    console.log('Hello CadastronoticiaProvider Provider');
  }

  getAll(){
    return this.db.list(this.PATH, ref => ref.orderByChild('horario'))
    .snapshotChanges()
    .map(changes => {
       return changes.map(c => ({
         key: c.payload.key, ...c.payload.val()
       }))
    })
  }



  get(key:string){
    return this.db.object(this.PATH+ key)
    .snapshotChanges()
    //.orderByChild('texto')
    .map(c=> {
      return { key: c.key, ...c.payload.val()};
    })
  }

  save(contact:any){
      return new Promise((resolve,reject) =>{
        if (contact.key){
              this.db.list(this.PATH)
              .update(contact.key, { titulo: contact.titulo, imagem: contact.imagem,
                                     texto: contact.texto, autor: contact.autor, horario: contact.horario})
              .then(()=> resolve())
              .catch((e)=> reject(e));
              }

        else{
          this.db.list(this.PATH)
          .push({ titulo: contact.titulo, imagem: contact.imagem,
                                 texto: contact.texto, autor: contact.autor, horario: contact.horario})
          .then(()=> resolve());
        }
      });
  }

  remove (key: string){
      return this.db.list(this.PATH).remove(key);
  }
}
