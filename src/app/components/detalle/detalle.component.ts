import { Component, Input, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() id;
  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;
  slideOpt = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };

  estrella = "star-outline";

  constructor(private _data: PeliculasService,
              private modalCtrl: ModalController,
              private _storage: StorageService) { }

 ngOnInit() {

    this._storage.existePelicula(this.id)
    .then( existe => this.estrella = (existe) ? 'star' : 'star-outline');


    console.log('ID: ', this.id);
    this._data.getPeliDetalle(this.id).subscribe( r => {
      console.log(r);
      this.pelicula = r;
    });

    this._data.getActores(this.id).subscribe( r => {
      console.log('Actores', r);
      this.actores = r.cast;
    });
  }

  back() {
    this.modalCtrl.dismiss();
  }

  fav() {
    const existe = this._storage.guardarPeli(this.pelicula);
    this.estrella = (existe) ? 'star' : 'star-outline';
  }

  


}
