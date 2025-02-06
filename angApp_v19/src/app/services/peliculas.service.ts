import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  
  private apiUrl = 'https://api.themoviedb.org/3/';
  private apiKey = '12b2ac3918ba5b411efede20eabdf03d';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de películas populares desde la API de TMDB.
   * @param page Número de página (por defecto es 1).
   * @returns Un Observable con los datos de la API.
   */
  getPeliculas(page: number = 1): Observable<any> {
    const url = `${this.apiUrl}movie/popular?api_key=${this.apiKey}&page=${page}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<any>(url, { headers });
  }
}
