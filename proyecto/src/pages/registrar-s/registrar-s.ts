import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the RegistrarSPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registrar-s',
  templateUrl: 'registrar-s.html',
})
export class RegistrarSPage {

  nombre = '';
  ubicacion = '';
  cp = '';
  costo = 0;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: Http,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarSPage');
  }

  clickHome(){
    console.log(this.nombre);
    console.log(this.ubicacion);
    console.log(this.cp);
    console.log(this.costo);
    console.log(this.navParams.get('id'));

    this.http.get('registrarS/?nombre=' + this.nombre +
                  '&ubicacion=' + this.ubicacion +
                  '&cp=' + this.cp +
                  '&id=' + this.navParams.get('id') +
                  '&costo=' + this.costo)
      .subscribe(data=>{
        console.log(data.text());
        if(data.text() == "True"){
          const alerta = this.alertCtrl.create(
            {
              title: 'Listo',
              subTitle: 'Salon creado',
              buttons: ['Ok']
            }
          );
          alerta.present();
        }
        else{ 
          const alerta = this.alertCtrl.create(
            {
              title: 'Oops!',
              subTitle: 'El Salon no se creo',
              buttons: ['Ok']
            }
          );
          alerta.present();
        }
      }, error=>{
        const alerta = this.alertCtrl.create(
          {
            title: 'Error',
            subTitle: '',
            buttons: ['Ok']
          }
        );
        alerta.present();
      });
    this.navCtrl.pop();
  }

  cancelar(){
    //close(); volver atras ;)
    this.navCtrl.pop();
  }
}
