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

  getPeliculas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}movie/popular?api_key=${this.apiKey}&page=1`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }
}