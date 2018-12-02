import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the MostrarSalonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mostrar-salon',
  templateUrl: 'mostrar-salon.html',
})
export class MostrarSalonPage {

  salones = [];
  horas = 0;
  usuario = '';
  salon = 0;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: Http,
              public alertCtrl: AlertController) {
    console.log(this.navParams.get('id'));
    this.obtenerSalon();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MostrarSalonPage');
  }

  obtenerSalon(){
    this.http.get('/salon/?id_Salon=' + this.navParams.get('id'))
      .subscribe( data=> {
        this.salones = data.json();
        console.log(this.salones);  
        this.usuario = this.navParams.get('correo');
        this.salon = this.navParams.get('id');
      }, error=>{
        console.log('error al recuperar salon');
      });
  }

  rentarSalon(){
    this.http.get('/rentar/?usuario=' + this.usuario +
                  '&salon=' + this.salon +
                  '&horas=' + this.horas)
      .subscribe( data=> {
        const alerta = this.alertCtrl.create(
          { 
            title: 'Salon solicitado',
            subTitle: 'Solicitud completada',
            buttons: ['Ok']
          }
        );
        alerta.present();
        this.navCtrl.pop();
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
  }

  cancelar(){
    this.navCtrl.pop();
  }

}
