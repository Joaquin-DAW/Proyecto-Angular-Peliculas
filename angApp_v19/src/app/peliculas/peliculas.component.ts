import { Component } from '@angular/core';
import { PeliculasService } from '../services/peliculas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css'
})
export class PeliculasComponent {
  peliculas: any[] = [];
  busqueda: string = ""; // Variable de búsqueda
  peliculasCarrusel: any[] = [];
  peliculasBusqueda: any[] = [];

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

    // Cargar películas para el carrusel (primeras 5) 
    this.peliculasService.getPeliculas().subscribe(response => {
      // Suponemos que response.results es el arreglo de películas
      this.peliculasCarrusel = response.results.slice(0,5);
    });
  }

  buscarPeliculas(): void {
      if (this.busqueda.trim() === "") {
        this.peliculasBusqueda = []; // Si el usuario borra el texto, limpiamos la búsqueda
        return;
      }
  
      this.peliculasService.buscarPeliculas(this.busqueda).subscribe(response => {
        this.peliculasBusqueda = response.results; // Guardamos los resultados de la búsqueda
      });
  }
}