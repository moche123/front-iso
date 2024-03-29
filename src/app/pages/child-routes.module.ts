import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { TemasComponent } from './mantenimientos/temas/temas.component';
import { PublicacionesComponent } from './mantenimientos/publicaciones/publicaciones.component';
import { PublicacionComponent } from './mantenimientos/publicaciones/publicacion.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';
import { VerPublicacionComponent } from './mantenimientos/publicaciones/ver-publicacion.component';
import { ArticulosAprobadosComponent } from './mantenimientos/articulos-aprobados/articulos-aprobados.component'

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Tablero' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' }},
  { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas' }},
  { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Reporte' }},
  { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' }},
  { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' }},
  { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }},
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }},

  // Mantenimientos
  { path: 'temas', component: TemasComponent, data: { titulo: 'Vista de Temas' }},
  { path: 'publicaciones', component: PublicacionesComponent, data: { titulo: 'Vista de Publicaciones' }},
  { path: 'publicacion/:id', component: PublicacionComponent, data: { titulo: 'Vista de Publicaciones' }},
  { path: 'publicacion/ver/:id', component: VerPublicacionComponent, data: { titulo: 'Observación de las Publicaciones' }},

  // Rutas de Admin
  { path: 'usuarios', canActivate: [ AdminGuard ], component: UsuariosComponent, data: { titulo: 'Matenimiento de Usuarios' }},
  { path: 'articulosaprobados', canActivate: [ AdminGuard ],component:ArticulosAprobadosComponent, data:{titulo: 'Mantinimiento de artículos aprobados'}  }
]



@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
