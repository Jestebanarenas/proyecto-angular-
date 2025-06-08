import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { DigitalSignature } from '../models/digitalsignature.model';

@Injectable({
  providedIn: 'root'
})
export class DigitalSignatureService {
  private apiUrl = 'http://127.0.0.1:5000/api/addresses';

  constructor(private http: HttpClient) {}

  getMySignature(): Observable<DigitalSignature> {
    return this.http.get<DigitalSignature>(`${this.apiUrl}/me`);
  }

  uploadSignature(data: FormData): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/upload`, data);
  }

  getByUserId(userId: number): Observable<DigitalSignature> {
    return this.http.get<DigitalSignature>(`${this.apiUrl}/user/${userId}`);
  }

  deleteSignature(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
