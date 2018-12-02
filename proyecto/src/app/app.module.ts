import { HomeDuenoPage } from './../pages/home-dueno/home-dueno';
import { RegistrarSPage } from './../pages/registrar-s/registrar-s';
import { MostrarSalonesPage } from './../pages/mostrar-salones/mostrar-salones';
import { MostrarSalonPage } from './../pages/mostrar-salon/mostrar-salon';
import { MostrarRegistroSalonesPage } from './../pages/mostrar-registro-salones/mostrar-registro-salones';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpModule } from '@angular/http';
import { RegistrarUPage } from '../pages/registrar-u/registrar-u';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HomeDuenoPage,
    LoginPage,
    MostrarRegistroSalonesPage,
    MostrarSalonPage,
    MostrarSalonesPage,
    RegistrarSPage,
    RegistrarUPage,
    MostrarSalonPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HomeDuenoPage,
    LoginPage,
    MostrarRegistroSalonesPage,
    MostrarSalonPage,
    MostrarSalonesPage,
    RegistrarSPage,
    RegistrarUPage,
    MostrarSalonPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
