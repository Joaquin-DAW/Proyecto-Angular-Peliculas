import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; //Permite leer el parámetro de la URL
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-busqueda',
  imports: [FormsModule,RouterModule ],
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class BusquedaComponent {
  query: string = '';
  resultados: any[] = [];
  ordenar: string = 'default';
  busquedaNueva: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {                          //Se ejecuta automaticamente cuando carga el componente
    this.route.paramMap.subscribe(params => { //obitiene el nombre de la pelicula de la url
      this.query = params.get('query') || ''; // Obtenemos el valor de la URL
      if (this.query.trim() !== '') {
        this.buscarPeliculas(); //Llamamos a la función para buscar películas
      }
    });
  }

  buscarPeliculas(): void {
    if (this.query.trim() === '') return;

    this.apiService.buscarPeliculas(this.query).subscribe(response => {
      this.resultados = response.results.map((pelicula: any) => ({
        ...pelicula,
        actores: [],
      }));

      // Para cada película, obtenemos el reparto
      this.resultados.forEach((pelicula) => {
        this.apiService.getReparto(pelicula.id).subscribe(reparto => {
          pelicula.actores = reparto.cast.slice(0, 3).map((actor: any) => actor.name); 
        });
      });
    });
  }

  buscarOtraPelicula(): void {
    if (this.busquedaNueva.trim() === '') return;
    this.router.navigate(['/buscar', this.busquedaNueva]);
  }

  ordenarResultados(): void {
    switch (this.ordenar) {
      case "titulo-asc":
        this.resultados.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "titulo-desc":
        this.resultados.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "fecha-asc":
        this.resultados.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
        break;
      case "fecha-desc":
        this.resultados.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
        break;
    }
  }
}
