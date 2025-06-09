import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  private apiUrl = `${environment.url_api_base}/user-roles`;

  constructor(private http: HttpClient) {}

  getRolesByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  addRoleToUser(userId: number, roleId: number): Observable<any> {
  const now = new Date();
  const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');

  return this.http.post(`${this.apiUrl}/user/${userId}/role/${roleId}`, {
    startAt: formattedDate,
    endAt: formattedDate // Ambos campos con fecha válida
  });
}

  removeRoleFromUser(userRoleId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userRoleId}`);
  }
}
