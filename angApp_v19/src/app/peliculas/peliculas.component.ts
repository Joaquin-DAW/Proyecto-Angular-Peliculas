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
    this.peliculasService.getPeliculas().subscribe(data => {
      this.peliculas = data.results;  
    });
  }
}
