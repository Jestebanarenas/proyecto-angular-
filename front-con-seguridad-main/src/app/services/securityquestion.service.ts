import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SecurityQuestion } from '../models/securityquestion.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityQuestionService {
  private apiUrl = `${environment.apiUrl}/security-question`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<SecurityQuestion[]> {
    return this.http.get<SecurityQuestion[]>(`${this.apiUrl}/`);
  }

  getById(id: number): Observable<SecurityQuestion> {
    return this.http.get<SecurityQuestion>(`${this.apiUrl}/${id}`);
  }

  create(question: { name: string; description?: string }): Observable<SecurityQuestion> {
    return this.http.post<SecurityQuestion>(`${this.apiUrl}/`, question);
  }

  update(id: number, question: { name: string; description?: string }): Observable<SecurityQuestion> {
    return this.http.put<SecurityQuestion>(`${this.apiUrl}/${id}`, question);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
