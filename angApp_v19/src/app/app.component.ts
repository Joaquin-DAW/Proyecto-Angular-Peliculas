import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PeliculasService } from './services/peliculas.service';
import { PeliculasComponent } from './peliculas/peliculas.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PeliculasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angApp_v19';
  peliculas: any[] = [];

  constructor(private peliculasService: PeliculasService) {}

  ngOnInit(): void {
    this.peliculasService.getPeliculas().subscribe((data) => {
      this.peliculas = data;
    });
  }
}
