import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Thumbnail } from 'ionic-angular';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

/**
 * Generated class for the RegistrarUPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registrar-u',
  templateUrl: 'registrar-u.html',
})
export class RegistrarUPage {

  nombre = '';
  apellidos = '';
  telefono = '';
  correo = '';
  password = '';
  tipo = 1;
  numCuenta = '';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: Http,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarUPage');
  }

  registrarUsuario(){
    if(this.numCuenta.length == 16){
      console.log(this.correo);
      console.log(this.password);
      console.log(this.numCuenta);
      this.tipo = 0;
      console.log('creando usuario');
      this.http.get('/registrarU/?nombre=' + this.nombre +
                    '&apellidos=' + this.apellidos +
                    '&telefono=' + this.telefono +
                    '&correo=' + this.correo + 
                    '&password=' + this.password +
                    '&tipo=' + this.tipo)
        .subscribe( data=>{
          if(data.text() == "True"){
            console.log('creando duenio');
            this.http.get('/registrarD/?usuario=' + this.correo +
                          '&password=' + this.password +
                          '&numCuenta=' + this.numCuenta)
              .subscribe( data=> {
                if(data.text() == "True"){
                  const alerta = this.alertCtrl.create(
                    {
                      title: 'Usuario creado',
                      subTitle: 'Bienvenido!',
                      buttons: ['Harakiri']
                    }
                  );
                  alerta.present();
                }
                else{
                  const alerta = this.alertCtrl.create(
                    {
                      title: 'Error',
                      subTitle: 'El usuario no pudo crearse',
                      buttons: ['Ok']
                    }
                  );
                  alerta.present();
                }
              }, error=> {
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
          else{
            const alerta = this.alertCtrl.create(
            {
              title: 'Error',
              subTitle: 'El usuario no pudo crearse',
              buttons: ['Ok']
            }
            );
            alerta.present();
          }
        }, error=> {
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
    else{
      console.log('crear usuario sin duenio');
      this.http.get('/registrarU/?nombre=' + this.nombre +
                    '&apellidos=' + this.apellidos +
                    '&telefono=' + this.telefono +
                    '&correo=' + this.correo + 
                    '&password=' + this.password +
                    '&tipo=' + this.tipo)
        .subscribe( data=> {
          const alerta = this.alertCtrl.create(
            {
              title: 'Usuario Creado',
              subTitle: 'Disfrute su estadia',
              buttons: ['Gracias']
            }
          );
          alerta.present();
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
    this.navCtrl.pop();
  }
  cancelar(){
    this.navCtrl.pop();
  }
}
