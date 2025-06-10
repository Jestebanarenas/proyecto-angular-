import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface RolePermission {
  id?: string;
  role_id: number;
  permission_id: number;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RolePermissionService {
  private apiUrl = `${environment.url_api_base}/role-permissions`;

  constructor(private http: HttpClient) { }

  // Obtener todas las relaciones
  getAllRolePermissions(): Observable<RolePermission[]> {
    return this.http.get<RolePermission[]>(`${this.apiUrl}/`);
  }

  // Obtener una relación por ID
  getById(id: string): Observable<RolePermission> {
    return this.http.get<RolePermission>(`${this.apiUrl}/${id}`);
  }

  // Obtener permisos por rol
  getRolePermissionsByRole(roleId: number): Observable<RolePermission[]> {
    return this.http.get<RolePermission[]>(`${this.apiUrl}/role/${roleId}`);
  }

  // Obtener roles por permiso
  getRolePermissionsByPermission(permissionId: number): Observable<RolePermission[]> {
    return this.http.get<RolePermission[]>(`${this.apiUrl}/permission/${permissionId}`);
  }

  // Crear una nueva relación rol-permiso
  createRolePermission(roleId: number, permissionId: number): Observable<RolePermission> {
    return this.http.post<RolePermission>(`${this.apiUrl}/role/${roleId}/permission/${permissionId}`, {});
  }

  // Eliminar una relación por role y permission
  deleteRolePermission(roleId: number, permissionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/role/${roleId}/permission/${permissionId}`);
  }

  // Eliminar una relación por ID
  deleteRolePermissionById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
