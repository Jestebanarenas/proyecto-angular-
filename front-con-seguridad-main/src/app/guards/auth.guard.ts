import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    if (this.securityService.existSession()) {
      const user = this.securityService.activeUserSession;
      console.log('Usuario autenticado:', user);
      return true;
    } else {
      console.log('Usuario no autenticado, redirigiendo al login');
      Swal.fire("Acceso Denegado", "Debe iniciar sesión para acceder a esta página", "warning");
      this.router.navigate(['/login']);
      return false;
    }
  }
}