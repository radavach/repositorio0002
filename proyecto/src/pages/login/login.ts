import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
//Agregada por mi
import { Http } from '@angular/http';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  home = HomePage;
  usuario = '';
  password = '';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: Http,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  clickHome(){
    console.log("Entrando a home");

    this.http.get('/login/?usuario=' + this.usuario + '&password=' + this.password )
      .subscribe( data => {
        console.log(data.text());
        if(data.text() == "True"){
          this.navCtrl.setRoot(this.home, {usuario: this.usuario});
        }
        else{
          const alerta = this.alertCtrl.create(
            {
              title: 'Lo siento',
              subTitle: 'Usuario/Contraseña son incorrectos',
              buttons: ['Ok']
            }
          )
          alerta.present();
        }
      }, error => {
        console.log("error");
        const alerta = this.alertCtrl.create(
          {
            title: 'Error',
            subTitle: '',
            buttons: ['Ok']
          }
        );
        alerta.present();
      }
    );
  }

}
