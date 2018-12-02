import { Http } from '@angular/http';
import { MostrarSalonPage } from './../mostrar-salon/mostrar-salon';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MostrarRegistroSalonesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mostrar-registro-salones',
  templateUrl: 'mostrar-registro-salones.html',
})
export class MostrarRegistroSalonesPage {
  
  mostrarSalonPage = MostrarSalonPage;
  salones = [];
  correo = ''

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: Http) {
    this.getSalones();
    this.correo = this.navParams.get('correo');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MostrarRegistroSalonesPage');
  }

  getSalones(){
    this.http.get('/salones/')
      .subscribe(data=> {
        console.log(data.text());
        this.salones = data.json();
    }, error=> {
        console.log('error');
    });

  }

  clickSalon(s){
    this.navCtrl.push(this.mostrarSalonPage, {id: s.id, correo: this.correo});
  }
  
}
