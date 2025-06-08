import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Password } from '../models/password.model';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private apiUrl = 'http://127.0.0.1:5000/api/passwords';

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
