import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import Swal from 'sweetalert2';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';
import { UsuarioService } from '../services/usuario.service';

declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  public usuario: Usuario;
  constructor( private settingsService: SettingsService,
               private sidebarService: SidebarService,
               private usuarioService: UsuarioService  ) {
                this.usuario = usuarioService.usuario;
                }

  ngOnInit(): void {
    customInitFunctions();
    this.sidebarService.cargarMenu();
    this.comprobarEscuelaEscogida();
  }
  comprobarEscuelaEscogida(){
    if(this.usuario.escuela == undefined && this.usuario.email.split('@')[1] == "unprg.edu.pe" && this.usuario.role!="ADMIN_ROLE"){
      Swal.fire('No olvides', `${ this.usuario.nombre }, aún no seleccionas tu escuela profesional, por favor, ir a tu perfil`, 'warning');
    }
  }
}
