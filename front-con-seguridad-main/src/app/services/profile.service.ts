import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  
  private apiUrl = 'http://localhost:5000/api/profiles'; // Cambia el puerto si tu backend usa otro

  constructor(private http: HttpClient) { }

  // Obtener todos los perfiles
  getAllProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.apiUrl}/`);
  }

  // Obtener perfil por ID
  getProfileById(profileId: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/${profileId}`);
  }

  // Obtener perfil por ID de usuario
  getProfileByUserId(userId: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/user/${userId}`);
  }

  // Crear perfil (con imagen)
  createProfile(userId: number, profile: { phone: string }, photo?: File): Observable<Profile> {
    const formData = new FormData();
    formData.append('phone', profile.phone);
    if (photo) {
      formData.append('photo', photo);
    }
    return this.http.post<Profile>(`${this.apiUrl}/user/${userId}`, formData);
  }

  // Actualizar perfil (con imagen)
  updateProfile(profileId: number, profile: { phone: string }, photo?: File): Observable<Profile> {
    const formData = new FormData();
    formData.append('phone', profile.phone);
    if (photo) {
      formData.append('photo', photo);
    }
    return this.http.put<Profile>(`${this.apiUrl}/${profileId}`, formData);
  }

  // Eliminar perfil
  deleteProfile(profileId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${profileId}`);
  }

  // Obtener imagen de perfil
  getProfileImage(filename: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${filename}`, { responseType: 'blob' });
  }
}
