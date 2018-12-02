import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeDuenoPage } from './home-dueno';

@NgModule({
  declarations: [
    HomeDuenoPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeDuenoPage),
  ],
})
export class HomeDuenoPageModule {}
