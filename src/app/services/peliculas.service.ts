import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaMDB } from '../interfaces/interfaces';

const apiKey = environment.apiKey;
const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private popuPage = 0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {
    query = URL + query;
    query = query + `&api_key=${apiKey}&language=es&include_image_language=es`;

    // console.log('buscando', query);
    return this.http.get<T>(query);
  }

  getCartelera() {
    const hoy = new Date();
    const ultimoDia = new Date( hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1;

    let mesString;

    if (mes < 10) {
      mesString = '0' + mes;

    } else {
      mesString = mes;
    }

    const inicio = `${ hoy.getFullYear() }-${ mesString }-01`;
    const fin = `${ hoy.getFullYear() }-${ mesString }-${ ultimoDia }`;

    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);
  }

  getPopulares() {
    this.popuPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popuPage}`;
    return this.ejecutarQuery<RespuestaMDB>(query);
  }
}
