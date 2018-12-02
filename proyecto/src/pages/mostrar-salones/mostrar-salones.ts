import { MostrarSalonPage } from './../mostrar-salon/mostrar-salon';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MostrarSalonesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mostrar-salones',
  templateUrl: 'mostrar-salones.html',
})
export class MostrarSalonesPage {

  mostrarSalonPage = MostrarSalonPage;
  salones = [];
  correo = '';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: Http) {
    this.getSalones();
    this.correo = this.navParams.get('correo');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MostrarSalonesPage');
  }

  getSalones(){
    this.http.get('/salonesD/?id_usuario=' + this.navParams.get('id'))
      .subscribe( data=> {
        this.salones = data.json();
      }, error=>{
        console.log('error recuperando salones')
      });
  }

  clickSalon(s){
    this.navCtrl.push(this.mostrarSalonPage, {id: s.id, coreo: this.correo});
  }
}
