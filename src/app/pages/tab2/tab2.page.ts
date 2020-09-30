import { Component } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { PeliculasService } from '../../services/peliculas.service';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  {

  buscarTexto = '';
  ideas: string[] = ['Spiderman', 'Batman', 'El señor de los anillos', 'En busca de la felicidad'];
  peliculas: Pelicula[] = [];
  spinner = false;


  constructor(private _data: PeliculasService,
              private modalCtrl: ModalController) {}


  buscar(ev) {
    const valor = ev.detail.value;
    if (valor.trim().length === 0) {
      this.spinner = false;
      this.peliculas = [];
      return;
    }
    this.spinner = true;
    console.log('buscando: ', valor);
    this._data.buscarPelicula(valor).subscribe( r => {
      this.peliculas = r.results;
      this.spinner = false;
    });
  }


  async verDetalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }
}
