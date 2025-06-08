import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserAnswer } from '../models/answer.model';

@Injectable({
  providedIn: 'root'
})
export class UserAnswerService {
  private apiUrl = `${environment.apiUrl}/user-answer`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<UserAnswer[]> {
    return this.http.get<UserAnswer[]>(`${this.apiUrl}`);
  }

  getByUserId(userId: number): Observable<UserAnswer[]> {
    return this.http.get<UserAnswer[]>(`${this.apiUrl}/user/${userId}`);
  }

  getById(id: number): Observable<UserAnswer> {
    return this.http.get<UserAnswer>(`${this.apiUrl}/${id}`);
  }

  create(answer: UserAnswer): Observable<UserAnswer> {
    return this.http.post<UserAnswer>(this.apiUrl, answer);
  }

  update(id: number, answer: UserAnswer): Observable<UserAnswer> {
    return this.http.put<UserAnswer>(`${this.apiUrl}/${id}`, answer);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
