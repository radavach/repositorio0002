import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MostrarRegistroSalonesPage } from './mostrar-registro-salones';

@NgModule({
  declarations: [
    MostrarRegistroSalonesPage,
  ],
  imports: [
    IonicPageModule.forChild(MostrarRegistroSalonesPage),
  ],
})
export class MostrarRegistroSalonesPageModule {}
