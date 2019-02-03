import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import { Platform, AlertController } from 'ionic-angular'

@Injectable()
export class NotificacoesProvider {

  constructor(
    private storage: Storage,
    private platform: Platform,
    public alertCtrl: AlertController
  ) {

  }

  create(notificacao: string) {
    this.storage.set('tipoNotificacao', notificacao);
  }

  getTipoNotificacao(): Promise<any> {
    return this.storage.get('tipoNotificacao');
  }

  remove() {
    this.storage.remove('tipoNotificacao');
  }
}
