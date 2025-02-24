import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router, RouterModule  } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css'
})
export class PeliculasComponent {
  peliculas: any[] = [];
  busqueda: string = ""; // Variable de búsqueda
  peliculasCarrusel: any[] = [];
  peliculasBusqueda: any[] = [];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.cargarPeliculas();
  }

  cargarPeliculas(): void {
    const totalPages = 1;
    
    for (let page = 1; page <= totalPages; page++) {
      this.apiService.getPeliculas(page).subscribe(response => {
        // Suponemos que response.results es el arreglo de películas
        this.peliculas = this.peliculas.concat(response.results);
      });
    }

    // Cargar películas para el carrusel (primeras 5) 
    this.apiService.getPeliculas().subscribe(response => {
      // Suponemos que response.results es el arreglo de películas
      this.peliculasCarrusel = response.results.slice(0,5);
    });
  }

  buscarPeliculas(): void {
    if (this.busqueda.trim() === "") return;
    this.router.navigate(['/buscar', this.busqueda]); // Redirige a la pagina de busqueda
  }
  
}