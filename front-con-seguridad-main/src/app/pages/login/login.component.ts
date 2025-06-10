import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  user: User;
  socialUser: SocialUser | null = null;

  constructor(
    private securityService: SecurityService,
    private router: Router,
    private authService: SocialAuthService
  ) {
    this.user = { email: "", password: "" }
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

  loginWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      this.socialUser = userData;
      // Aquí puedes enviar el token al backend para autenticar/registrar al usuario
      // Por ejemplo:
      this.securityService.loginWithGoogle(userData.idToken).subscribe({
        next: (data) => {
          this.securityService.saveSession(data);
          this.router.navigate(["dashboard"]);
        },
        error: () => {
          Swal.fire("Error", "No se pudo iniciar sesión con Google", "error");
        }
      });
    });
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

}
