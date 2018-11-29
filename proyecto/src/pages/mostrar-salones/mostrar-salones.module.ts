import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MostrarSalonesPage } from './mostrar-salones';

@NgModule({
  declarations: [
    MostrarSalonesPage,
  ],
  imports: [
    IonicPageModule.forChild(MostrarSalonesPage),
  ],
})
export class MostrarSalonesPageModule {}
