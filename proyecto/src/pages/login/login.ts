import { HomeDuenoPage } from './../home-dueno/home-dueno';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
//Agregada por mi
import { Http } from '@angular/http';
import { RegistrarUPage } from '../registrar-u/registrar-u';

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
  homeDueno = HomeDuenoPage;
  crearU = RegistrarUPage;
  usuario = '';
  password = '';
  nombre = '';
  dataU = [];

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
        this.dataU = data.json();
        console.log(data.text());
        //console.log(this.dataU[0].nombreD);

        if(this.dataU[0] != null && this.dataU[0].tipo == "1"){
          console.log("cliente");
          this.nombre = this.dataU[0].nombreD;
          this.navCtrl.setRoot(this.home, {id: this.dataU[0].id, usuario: this.usuario, password: this.password, nombreD: this.nombre});
        }
        else if(this.dataU[0] != null && this.dataU[0].tipo == "0"){
          console.log("dueño");
          this.nombre = this.dataU[0].nombreD;
          this.navCtrl.setRoot(this.homeDueno, {id: this.dataU[0].id, usuario: this.usuario, password: this.password, nombreD: this.nombre});
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
  
  registrarUsuario(){
    console.log("creando ando usuariando");
    this.navCtrl.push(this.crearU);
  }

}
