import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovocursoPage } from './novocurso';

@NgModule({
  declarations: [
    NovocursoPage,
  ],
  imports: [
    IonicPageModule.forChild(NovocursoPage),
  ],
})
export class NovocursoPageModule {}
