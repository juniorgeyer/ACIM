import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovanoticiaPage } from './novanoticia';

@NgModule({
  declarations: [
    NovanoticiaPage,
  ],
  imports: [
    IonicPageModule.forChild(NovanoticiaPage),
  ],
})
export class NovanoticiaPageModule {}
