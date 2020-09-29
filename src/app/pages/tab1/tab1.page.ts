import { Component, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Pelicula } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  peliculasRecientes: Pelicula[] = [];
  peliculasPopulares: Pelicula[] = [];

  

  constructor(private _pelis: PeliculasService) {}
  ngOnInit(): void {
    this._pelis.getCartelera().subscribe( r => {
      console.log('Resp', r);
      this.peliculasRecientes = r.results;
    });

    this.getPopulares();
  }

  cargarMas() {
    this.getPopulares();
  }

  getPopulares() {
    this._pelis.getPopulares().subscribe( r => {
      // console.log('Resp populares', r);
      this.peliculasPopulares.push(... r.results);
      // this.peliculasPopulares = r.results;
    });
  }

}
