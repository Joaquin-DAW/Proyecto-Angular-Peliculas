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

  getPeliculas(page: number = 1): Observable<any> {
    const url = `${this.apiUrl}movie/popular?api_key=${this.apiKey}&page=${page}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<any>(url, { headers });
  }

  buscarPeliculas(query: string): Observable<any> {
    const url = `${this.apiUrl}search/movie?api_key=${this.apiKey}&language=es-ES&query=${query}`;
    return this.http.get<any>(url);
  }
}
