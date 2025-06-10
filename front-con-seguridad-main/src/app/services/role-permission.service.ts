import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:5000/role-permission';

  constructor(private http: HttpClient) {}

  // Obtener todas las relaciones
  getAll(): Observable<RolePermission[]> {
    return this.http.get<RolePermission[]>(`${this.apiUrl}/`);
  }

  // Obtener una relación por ID
  getById(id: string): Observable<RolePermission> {
    return this.http.get<RolePermission>(`${this.apiUrl}/${id}`);
  }

  // Obtener permisos por rol
  getByRoleId(roleId: number): Observable<RolePermission[]> {
    return this.http.get<RolePermission[]>(`${this.apiUrl}/role/${roleId}`);
  }

  // Obtener roles por permiso
  getByPermissionId(permissionId: number): Observable<RolePermission[]> {
    return this.http.get<RolePermission[]>(`${this.apiUrl}/permission/${permissionId}`);
  }

  // Crear una nueva relación rol-permiso
  create(roleId: number, permissionId: number, data: any = {}): Observable<RolePermission> {
    return this.http.post<RolePermission>(`${this.apiUrl}/role/${roleId}/permission/${permissionId}`, data);
  }

  // Actualizar una relación por ID
  update(id: string, data: Partial<RolePermission>): Observable<RolePermission> {
    return this.http.put<RolePermission>(`${this.apiUrl}/${id}`, data);
  }

  // Eliminar una relación por ID
  deleteById(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Eliminar una relación por role y permission
  delete(roleId: number, permissionId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/role/${roleId}/permission/${permissionId}`);
  }
}
