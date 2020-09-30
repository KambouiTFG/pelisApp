import { Component, OnInit } from '@angular/core';
import { Genre, PeliculaDetalle } from '../../interfaces/interfaces';
import { StorageService } from '../../services/storage.service';
import { PeliculasService } from '../../services/peliculas.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];

  favoritoGenero: any[] = [];

  constructor(private _storage: StorageService,
              private _pelis: PeliculasService) {}



  async ngOnInit() {}

  async ionViewWillEnter() {
    this.peliculas = await this._storage.cargarFavoritos();
    this.generos = await this._pelis.cargarGeneros();
    
    this.pelisPorGenero(this.generos, this.peliculas);
  }

  pelisPorGenero(generos: Genre[], peliculas: PeliculaDetalle[]) {
    this.favoritoGenero = [];

    generos.forEach( genero => {
      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter(peli => {
          return peli.genres.find( genre => genre.id === genero.id);
        })
      });
    });

    console.log(this.favoritoGenero);

  }





}
