import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Password } from '../models/password.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private apiUrl = `${environment.url_api_base}/passwords`;

  constructor(private http: HttpClient) {}

  getPasswordsByUser(userId: number): Observable<Password[]> {
    return this.http.get<Password[]>(`${this.apiUrl}/user/${userId}`);
  }

  getCurrentPassword(userId: number): Observable<Password> {
    return this.http.get<Password>(`${this.apiUrl}/user/${userId}/current`);
  }

  createPassword(userId: number, password: Password): Observable<Password> {
    return this.http.post<Password>(`${this.apiUrl}/user/${userId}`, password);
  }

  updatePassword(passwordId: number, password: Password): Observable<Password> {
    return this.http.put<Password>(`${this.apiUrl}/${passwordId}`, password);
  }

  deletePassword(passwordId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${passwordId}`);
  }
}
