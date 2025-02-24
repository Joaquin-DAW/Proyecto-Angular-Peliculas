import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule  } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-detalle-actor',
  imports: [RouterModule ],
  templateUrl: './detalle-actor.component.html',
  styleUrl: './detalle-actor.component.css'
})
export class DetalleActorComponent {
  actor: any = {};
  peliculas: any[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const actorId = params.get('id');
      if (actorId) {
        this.apiService.getActorDetalles(+actorId).subscribe(data => {
          this.actor = data;
        });

        this.apiService.getActorPeliculas(+actorId).subscribe(data => {
          this.peliculas = (data.cast || []).slice(0, 8); //Limitamos a 5 películas
        });
      }
    });
  }
}
