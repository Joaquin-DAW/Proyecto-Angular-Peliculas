import { Component } from '@angular/core';
import { PeliculasService } from '../services/peliculas.service';

@Component({
  selector: 'app-peliculas',
  imports: [],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css'
})
export class PeliculasComponent {
  peliculas: any[] = [];

  constructor(private peliculasService: PeliculasService) { }

  ngOnInit(): void {
    this.cargarPeliculas();
  }

  cargarPeliculas(): void {
    const totalPages = 1; // Por ejemplo, combinamos 3 páginas (aprox. 60 películas)
    for (let page = 1; page <= totalPages; page++) {
      this.peliculasService.getPeliculas(page).subscribe(response => {
        // Suponemos que response.results es el arreglo de películas
        this.peliculas = this.peliculas.concat(response.results);
      });
    }
  }
}
