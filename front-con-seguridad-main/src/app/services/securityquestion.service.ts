import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SecurityQuestion } from '../models/securityquestion.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityQuestionService {
  private apiUrl = 'http://127.0.0.1:5000/api/addresses';

  constructor(private http: HttpClient) {}

  getAll(): Observable<SecurityQuestion[]> {
    return this.http.get<SecurityQuestion[]>(this.apiUrl);
  }

  getById(id: number): Observable<SecurityQuestion> {
    return this.http.get<SecurityQuestion>(`${this.apiUrl}/${id}`);
  }

  create(question: SecurityQuestion): Observable<SecurityQuestion> {
    return this.http.post<SecurityQuestion>(this.apiUrl, question);
  }

  update(id: number, question: SecurityQuestion): Observable<SecurityQuestion> {
    return this.http.put<SecurityQuestion>(`${this.apiUrl}/${id}`, question);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
