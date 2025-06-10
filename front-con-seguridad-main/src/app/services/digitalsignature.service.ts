import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { DigitalSignature } from '../models/digitalsignature.model';

@Injectable({
  providedIn: 'root'
})
export class DigitalSignatureService {
  private apiUrl = `${environment.apiUrl}/digital-signatures`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<DigitalSignature[]> {
    return this.http.get<DigitalSignature[]>(`${this.apiUrl}/`);
  }

  getById(id: number): Observable<DigitalSignature> {
    return this.http.get<DigitalSignature>(`${this.apiUrl}/${id}`);
  }

  getByUserId(userId: number): Observable<DigitalSignature> {
    return this.http.get<DigitalSignature>(`${this.apiUrl}/user/${userId}`);
  }

  create(userId: number, file: File): Observable<DigitalSignature> {
    const formData = new FormData();
    formData.append('photo', file);
    return this.http.post<DigitalSignature>(`${this.apiUrl}/user/${userId}`, formData);
  }

  update(signatureId: number, file: File): Observable<DigitalSignature> {
    const formData = new FormData();
    formData.append('photo', file);
    return this.http.put<DigitalSignature>(`${this.apiUrl}/${signatureId}`, formData);
  }

  delete(signatureId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${signatureId}`);
  }

  getSignatureImageUrl(photoPath: string): string {
    // Devuelve la URL absoluta para mostrar la imagen
    return `${this.apiUrl}/${photoPath}`;
  }
}
