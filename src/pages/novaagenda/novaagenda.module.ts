import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovaagendaPage } from './novaagenda';

@NgModule({
  declarations: [
    NovaagendaPage,
  ],
  imports: [
    IonicPageModule.forChild(NovaagendaPage),
  ],
})
export class NovaagendaPageModule {}
