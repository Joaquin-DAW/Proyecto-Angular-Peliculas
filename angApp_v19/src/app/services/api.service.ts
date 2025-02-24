import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
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
    return this.http.get<any>(url); //Se hace la petición a la API y se optienen los resultados
  }

  getReparto(id: number): Observable<any> {
    const url = `${this.apiUrl}movie/${id}/credits?api_key=${this.apiKey}&language=es-ES`;
    return this.http.get<any>(url).pipe(
      map(response => response.cast.map((actor: any) => ({
        nombre: actor.name,
        personaje: actor.character,
        foto: actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : 'https://via.placeholder.com/200x300?text=No+Image'
      })))
    );
  }

  getDetallesPelicula(id: number): Observable<any> {
    const url = `${this.apiUrl}movie/${id}?api_key=${this.apiKey}&append_to_response=videos,credits`;
    return this.http.get<any>(url);
  }

  getActorDetalles(id: number): Observable<any> {
    const url = `${this.apiUrl}person/${id}?api_key=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  getActorPeliculas(id: number): Observable<any> {
    const url = `${this.apiUrl}person/${id}/movie_credits?api_key=${this.apiKey}`;
    return this.http.get<any>(url);
  }
  
}
