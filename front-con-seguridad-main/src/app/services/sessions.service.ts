import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sessions } from '../models/sessions.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl = `${environment.apiUrl}/sessions`;  // Ruta para las sesiones en el backend

  constructor(private http: HttpClient) {}

  // Obtener todas las sesiones de un usuario
  getSessionsByUserId(userId: number): Observable<Sessions[]> {
    return this.http.get<Sessions[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Crear una nueva sesión
  createSession(session: Sessions): Observable<Sessions> {
    return this.http.post<Sessions>(this.apiUrl, session);
  }

  // Terminar una sesión
  endSession(sessionId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${sessionId}/end`, {});
  }

  // Eliminar una sesión (por ejemplo, logout forzado)
  deleteSession(sessionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${sessionId}`);
  }
}
