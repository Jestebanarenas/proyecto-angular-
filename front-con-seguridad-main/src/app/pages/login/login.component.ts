import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  user: User;

  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {
    this.user = { email: "", password: "" }
  }

  ngOnInit() {
    // Ya no necesitamos suscribirse a authService
  }

  ngAfterViewInit() {
    // Esperar un poco para que el DOM esté listo
    setTimeout(() => {
      this.initializeGoogleSignIn();
    }, 500);
  }

  initializeGoogleSignIn() {
    if (typeof google !== 'undefined') {
      try {
        google.accounts.id.initialize({
          client_id: '186352635832-f80sq0qqvi2rctaabiajaap4u6p0qv8k.apps.googleusercontent.com',
          callback: (response: any) => this.handleGoogleSignIn(response),
          auto_select: false,
          cancel_on_tap_outside: true
        });
        
        // Renderizar el botón automáticamente
        this.renderGoogleButton();
      } catch (error) {
        console.error('Error inicializando Google Sign-In:', error);
      }
    } else {
      console.error('Google Identity Services no está cargado');
      // Reintentar después de un tiempo
      setTimeout(() => {
        this.initializeGoogleSignIn();
      }, 1000);
    }
  }

  renderGoogleButton() {
    const buttonContainer = document.getElementById("google-signin-button");
    if (buttonContainer && typeof google !== 'undefined') {
      // Limpiar el contenedor primero
      buttonContainer.innerHTML = '';
      
      try {
        google.accounts.id.renderButton(
          buttonContainer,
          { 
            theme: "outline", 
            size: "large",
            type: "standard",
            text: "signin_with",
            shape: "rectangular",
            logo_alignment: "left",
            width: 250
          }
        );
      } catch (error) {
        console.error('Error renderizando botón de Google:', error);
      }
    }
  }

  loginWithGoogle() {
    if (typeof google !== 'undefined') {
      google.accounts.id.prompt();
    } else {
      console.error('Google Identity Services no está disponible');
      Swal.fire("Error", "Google Sign-In no está disponible", "error");
    }
  }

  handleGoogleSignIn(response: any) {
    try {
      // Decodificar el JWT token para obtener la información del usuario
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      
      // Mostrar información detallada en consola
      console.log('=== GOOGLE LOGIN SUCCESS ===');
      console.log('Token completo:', response.credential);
      console.log('Header del token:', JSON.parse(atob(response.credential.split('.')[0])));
      console.log('Payload del token:', payload);
      console.log('Usuario Google:', {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture
      });
      console.log('=============================');
      console.log('EMAIL PARA AGREGAR A ADMIN:', payload.email);
      
      const googleUserSession = {
        user: {
          id: payload.sub,
          name: payload.name,
          email: payload.email
        },
        token: response.credential
      };
      
      this.securityService.saveSession(googleUserSession);
      this.router.navigate(["dashboard"]);
      Swal.fire("Éxito", "Inicio de sesión con Google exitoso", "success");
    } catch (error) {
      console.error('Error procesando respuesta de Google:', error);
      Swal.fire("Error", "Error procesando la respuesta de Google", "error");
    }
  }

  login() {
    this.securityService.login(this.user).subscribe({
      next: (data) => {
        this.securityService.saveSession(data)
        this.router.navigate(["dashboard"])
      },
      error: (error) => {
        Swal.fire("Autenticación Inválida", "Usuario o contraseña inválido", "error")
      }
    })
  }

  ngOnDestroy() {
  }
}
