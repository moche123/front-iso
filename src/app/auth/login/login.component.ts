import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '' , [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    remember: [false]
  });


  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private ngZone: NgZone ) { }

  ngOnInit(): void {
    this.renderButton();
  }


  login() {
    //console.log(this.loginForm.value);
    if(this.loginForm.value.email.length<=0
      || this.loginForm.value.password.length<=0 ) {
      Swal.fire('Atento','Llene todos los campos del formulario' , 'warning' );
      return;
    }
    this.usuarioService.login( this.loginForm.value )
      .subscribe( resp => {

        if ( this.loginForm.get('remember').value ){
          localStorage.setItem('email', this.loginForm.get('email').value );
        } else {
          localStorage.removeItem('email');
        }

        // Navegar al Dashboard
        this.router.navigateByUrl('/');

      }, (err) => {
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error' );
      });

  }
  entrarVisitante(){
    this.loginForm.value.email = 'persona@hotmail.com';
    this.loginForm.value.password = '654321';
    this.loginForm.value.remember = false;
    console.log(this.loginForm);
    this.login();
  }
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 170,
      'height': 50,
      'longtitle': false,
      'theme': 'dark',
    });

    this.startApp();

  }

  async startApp() {

    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;

    this.attachSignin( document.getElementById('my-signin2') );

  };

  attachSignin(element) {

    this.auth2.attachClickHandler( element, {},
        (googleUser) => {
            const id_token = googleUser.getAuthResponse().id_token;
            // console.log(id_token);
            this.usuarioService.loginGoogle( id_token )
              .subscribe( resp => {

                this.ngZone.run( () => {
                  this.router.navigateByUrl('/');
                })
              });

        }, (error) => {
            alert(JSON.stringify(error, undefined, 2));
        });
  }

}
