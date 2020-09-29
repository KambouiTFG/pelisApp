import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {
  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();

  slidesOpt = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -10

  };
  constructor() { }

  ngOnInit() {}

  cargar() {
    this.cargarMas.emit();
  }

}
