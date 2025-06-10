import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    if (!this.securityService.existSession()) {
      Swal.fire("Acceso Denegado", "Debe iniciar sesión", "warning");
      this.router.navigate(['/login']);
      return false;
    }

    const user = this.securityService.activeUserSession;
    
    // Verificar si es un usuario admin
    const isAdmin = this.isAdminUser(user);
    
    if (isAdmin) {
      console.log('Usuario admin autorizado:', user);
      return true;
    } else {
      console.log('Usuario sin permisos de admin:', user);
      console.log('Email del usuario:', user.email); // Para debug
      Swal.fire("Acceso Denegado", `No tiene permisos de administrador. Email: ${user.email}`, "error");
      this.router.navigate(['/dashboard']);
      return false;
    }
  }

  private isAdminUser(user: any): boolean {
    console.log('Verificando si es admin:', user);
    
    // Lista de emails autorizados (AGREGA TU EMAIL AQUÍ)
    const adminEmails = [
      'admin@gmail.com',
      'tu-email@gmail.com', // Reemplaza con tu email real
      'xmaxt@ejemplo.com',
      'juan.ballesteros30224@ucaldas.edu.co' // Ejemplo, cambia por tu email
      // Agrega más emails aquí según necesites
    ];
    
    if (user.email && adminEmails.includes(user.email)) {
      console.log('Usuario autorizado como admin:', user.email);
      return true;
    }
    
    // También permitir cualquier email que termine en @admin.com
    if (user.email && user.email.endsWith('@admin.com')) {
      return true;
    }
    
    console.log('Usuario NO autorizado como admin:', user.email);
    return false;
  }
}