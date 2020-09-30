import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Pelicula, PeliculaDetalle } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  peliculas: PeliculaDetalle[] = [];
  constructor(private storage: Storage,
              private toastCtrl: ToastController) {
                this.cargarFavoritos();
              }

  guardarPeli(pelicula: PeliculaDetalle) {

    let existe = false;
    let mensaje = '';

    for( const peli of this.peliculas) {
      if (peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }

    if (existe) {
      this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
      mensaje = 'Removido de favoritos';
    } else {
      this.peliculas.push(pelicula);
      mensaje = 'Añadido a favoritos';

    }

    this.storage.set('peliculas', this.peliculas);
    this.presentToast(mensaje);

    return !existe;
  }

  async presentToast(message){
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500
    });
    toast.present();
  }


  async cargarFavoritos() {
    const peliculas = await this.storage.get('peliculas');
    this.peliculas = peliculas || [];
    // console.log(this.peliculas);
    return this.peliculas;
  }

  async existePelicula(id) {
    id = Number(id);

    await this.cargarFavoritos();

    const existe = this.peliculas.find(peli => peli.id === id);

    return (existe) ? true : false;
  }
}
