import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SecurityService } from '../services/security.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // Obtener el token del usuario autenticado
    const user = this.securityService.activeUserSession;
    console.log('Usuario activo en interceptor:', user);
    let authReq = req;

    if (user && user.token) {
      console.log('Agregando token a la petición HTTP:', user.token.substring(0, 50) + '...');
      
      // Clonar la petición y agregar el header de autorización
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`
        }
      });
    }

    // --- Conteo de peticiones a users, roles y permissions (más flexible) ---
    const url = req.url.toLowerCase();
    let key: 'users' | 'roles' | 'permissions' | null = null;

    if (/\/users?(\/|$)/.test(url)) {
      key = 'users';
    } else if (/\/roles?(\/|$)/.test(url)) {
      key = 'roles';
    } else if (/\/permissions?(\/|$)/.test(url)) {
      key = 'permissions';
    }

    if (key) {
      let entityCounter: { users: number; roles: number; permissions: number };
      const entityCounterStr = localStorage.getItem('entityCounter');
      if (entityCounterStr) {
        entityCounter = JSON.parse(entityCounterStr);
      } else {
        entityCounter = { users: 0, roles: 0, permissions: 0 };
      }
      entityCounter[key] = (entityCounter[key] || 0) + 1;
      localStorage.setItem('entityCounter', JSON.stringify(entityCounter));
    }
    // --- Fin conteo ---

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en petición HTTP:', error);
        
        if (error.status === 401) {
          // Token inválido o expirado
          console.log('Token inválido, cerrando sesión');
          Swal.fire("Sesión Expirada", "Su sesión ha expirado, por favor inicie sesión nuevamente", "warning");
          this.securityService.logout();
          this.router.navigate(['/login']);
        }
        
        if (error.status === 403) {
          // Sin permisos
          Swal.fire("Acceso Denegado", "No tiene permisos para realizar esta acción", "error");
        }
        
        return throwError(error);
      })
    );
  }
}