import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Permission {
  id: number;
  url: string;
  method: string;
  entity: string;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private apiUrl = 'http://localhost:5000/api/permissions'; // Ajusta la URL según tu backend

  constructor(private http: HttpClient) { }

  getAllPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${this.apiUrl}/`);
  }

  getPermission(id: number): Observable<Permission> {
    return this.http.get<Permission>(`${this.apiUrl}/${id}`);
  }

  createPermission(permission: Partial<Permission>): Observable<Permission> {
    return this.http.post<Permission>('http://localhost:5000/api/permissions/', permission);
  }

  updatePermission(id: number, permission: Partial<Permission>): Observable<Permission> {
    return this.http.put<Permission>(`${this.apiUrl}/${id}`, permission);
  }

  deletePermission(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getPermissionsGroupedByRole(roleId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/grouped/role/${roleId}`);
  }
}
