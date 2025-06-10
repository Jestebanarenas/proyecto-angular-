import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuard implements CanActivate {

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
    
    // Verificar si es un super administrador (más restrictivo)
    const isSuperAdmin = this.isSuperAdminUser(user);
    
    if (isSuperAdmin) {
      console.log('Super admin autorizado:', user);
      return true;
    } else {
      console.log('Usuario sin permisos de super admin:', user);
      Swal.fire("Acceso Denegado", "No tiene permisos para realizar cambios críticos", "error");
      this.router.navigate(['/seguridad']);
      return false;
    }
  }

  private isSuperAdminUser(user: any): boolean {
    // Lista más restrictiva para operaciones críticas
    const superAdminEmails = [
      'super-admin@gmail.com',
      'tu-email-principal@gmail.com' // Solo tu email principal aquí
    ];
    
    return user.email && superAdminEmails.includes(user.email);
  }
}