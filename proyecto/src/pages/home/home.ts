import { LoginPage } from './../login/login';
import { MostrarSalonesPage } from './../mostrar-salones/mostrar-salones';
import { MostrarSalonPage } from './../mostrar-salon/mostrar-salon';
import { Http } from '@angular/http';
import { MostrarRegistroSalonesPage } from './../mostrar-registro-salones/mostrar-registro-salones';

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loginPage = LoginPage;
  rentarSalonPage = MostrarRegistroSalonesPage;
  mostrarSalonPage = MostrarSalonPage;

  salones = [];
  nombre = '';
  correo = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http) {

    console.log(this.navParams.get('usuario'));
    this.getSalones();
    this.nombre = this.navParams.get('nombreD');
    this.correo = this.navParams.get('usuario');
    console.log(this.nombre);
  }

  getSalones(){
    this.http.get('/historial/?usuario=' +
     this.navParams.get('usuario') )
     .subscribe(data => {
       console.log(data.text());
       this.salones = data.json();
     }, error1 => {
       console.log('error');
     });
  }

  rentarSalon(){
    this.navCtrl.push(this.rentarSalonPage, {correo: this.correo});
  }

  clickSalon(s){
    this.navCtrl.push(this.mostrarSalonPage, {id: s.id, correo: this.correo});
  }

}
