import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';
import { SocialAuthService, SocialUser, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  user: User;
  socialUser: SocialUser | null = null;

  constructor(
    private securityService: SecurityService,
    private router: Router,
    private authService: SocialAuthService
  ) {
    this.user = { email: "", password: "" }
  }

  ngOnInit() {
    // Suscribirse a los cambios de estado de autenticación (para otros proveedores)
    this.authService.authState.subscribe((user) => {
      if (user && user.provider !== 'GOOGLE') {
        this.socialUser = user;
        this.handleSocialLogin(user);
      }
    });
  }

  ngAfterViewInit() {
    // Inicializar Google Identity Services
    this.initializeGoogleSignIn();
  }

  initializeGoogleSignIn() {
    if (typeof google !== 'undefined') {
      google.accounts.id.initialize({
        client_id: '186352635832-f80sq0qqvi2rctaabiajaap4u6p0qv8k.apps.googleusercontent.com',
        callback: (response: any) => this.handleGoogleSignIn(response)
      });
    }
  }

  loginWithGoogle() {
    if (typeof google !== 'undefined') {
      google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Fallback: mostrar el one-tap
          console.log('One-tap no se pudo mostrar, intentando popup');
          // O puedes renderizar el botón directamente
          this.renderGoogleButton();
        }
      });
    } else {
      console.error('Google Identity Services no está disponible');
      Swal.fire("Error", "Google Sign-In no está disponible", "error");
    }
  }

  renderGoogleButton() {
    if (typeof google !== 'undefined') {
      google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        { 
          theme: "outline", 
          size: "large",
          type: "standard",
          text: "signin_with"
        }
      );
    }
  }

  handleGoogleSignIn(response: any) {
    // Decodificar el JWT token para obtener la información del usuario
    const payload = JSON.parse(atob(response.credential.split('.')[1]));
    
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
  }

  handleSocialLogin(user: SocialUser) {
    console.log('Social user data:', user);
    
    const socialUserSession = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token: user.idToken || user.authToken
    };
    
    this.securityService.saveSession(socialUserSession);
    this.router.navigate(["dashboard"]);
    Swal.fire("Éxito", "Inicio de sesión exitoso", "success");
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
