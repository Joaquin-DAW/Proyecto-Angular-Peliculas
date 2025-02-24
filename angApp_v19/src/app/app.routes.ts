import { Routes } from '@angular/router';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DetallePeliculaComponent } from './detalle-pelicula/detalle-pelicula.component';
import { DetalleActorComponent } from './detalle-actor/detalle-actor.component';
import { ContactoComponent } from './contacto/contacto.component';

export const routes: Routes = [
    { path: '', component: PeliculasComponent }, // Página principal
    { path: 'buscar', component: BusquedaComponent }, // Búsqueda sin parametros
    { path: 'buscar/:query', component: BusquedaComponent }, // Búsqueda
    { path: 'pelicula/:id', component: DetallePeliculaComponent }, // Detalle de la película
    { path: 'actor/:id', component: DetalleActorComponent }, // Detalle del actor
    { path: 'contacto', component: ContactoComponent }, // Contacto
];
