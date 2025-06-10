import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sessions } from '../models/sessions.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl = `${environment.apiUrl}/sessions`;

  constructor(private http: HttpClient) {}

  // Obtener todas las sesiones de un usuario
  getSessionsByUserId(userId: number): Observable<Sessions[]> {
    return this.http.get<Sessions[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Crear una nueva sesión
  createSession(userId: number, session: Sessions): Observable<Sessions> {
    return this.http.post<Sessions>(`${this.apiUrl}/user/${userId}`, session);
  }

  // Terminar una sesión - usar PUT directo al ID de la sesión
  endSession(sessionId: string): Observable<Sessions> {
    const updateData = { state: 'inactive' };
    return this.http.put<Sessions>(`${this.apiUrl}/${sessionId}`, updateData);
  }

  // Eliminar una sesión (por ejemplo, logout forzado)
  deleteSession(sessionId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${sessionId}`);
  }
}
