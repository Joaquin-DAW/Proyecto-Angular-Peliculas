import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule  } from '@angular/router';
import { ApiService } from '../services/api.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detalle-pelicula',
  imports: [RouterModule ],
  templateUrl: './detalle-pelicula.component.html',
  styleUrl: './detalle-pelicula.component.css'
})
export class DetallePeliculaComponent {
  pelicula: any = null;
  reparto: any[] = [];
  trailerUrl: any = '';
  director: string = 'No disponible';

  constructor(private route: ActivatedRoute, private apiService: ApiService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.obtenerDetalles(+id);
      }
    });
  }

  obtenerDetalles(id: number): void {
    this.apiService.getDetallesPelicula(id).subscribe(response => {
      console.log("Datos de la película:", response);

      this.pelicula = response;

      // Obtener el primer tráiler de YouTube
      const trailers = response.videos?.results?.filter((video: any) => video.type === 'Trailer');
      console.log("Trailers encontrados:", trailers);

      if (trailers?.length) {
        this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${trailers[0].key}`
        );
      }

      // Obtener los primeros 10 actores del reparto
      this.reparto = response.credits?.cast?.slice(0, 10) || [];

      // Obtener el director
      const directorEncontrado = response.credits?.crew?.find((crewMember: any) => crewMember.job === 'Director');
      if (directorEncontrado) {
        this.director = directorEncontrado.name;
      }
    });
  }
}
