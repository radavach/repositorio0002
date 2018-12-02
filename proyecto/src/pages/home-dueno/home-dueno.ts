import { LoginPage } from './../login/login';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MostrarRegistroSalonesPage } from '../mostrar-registro-salones/mostrar-registro-salones';
import { MostrarSalonPage } from '../mostrar-salon/mostrar-salon';
import { MostrarSalonesPage } from '../mostrar-salones/mostrar-salones';
import { RegistrarSPage } from '../registrar-s/registrar-s';

/**
 * Generated class for the HomeDuenoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-dueno',
  templateUrl: 'home-dueno.html',
})
export class HomeDuenoPage {
  loginPage = LoginPage;
  mostrarSalonesPage = MostrarSalonesPage;
  registrarSalonPage = RegistrarSPage;
  rentarSalonPage = MostrarRegistroSalonesPage;
  mostrarSalonPage = MostrarSalonPage;

  salones = [];
  id = 0;
  nombre = '';
  correo = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http) {
      console.log(this.navParams.get('usuario'));
      this.getSalones();
      this.id = this.navParams.get('id');
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
  mostrarSalones(){
    this.navCtrl.push(this.mostrarSalonesPage, {id: this.id, correo: this.correo});
  } 
  registrarSalon(){
    this.navCtrl.push(this.registrarSalonPage, {id: this.id});
  }
}
