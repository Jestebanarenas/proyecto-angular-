import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.url_api_base}/users`; 

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/');
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/', user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  trackEntity(req: any): void {
    const url = req.url.toLowerCase();
    let key: 'users' | 'roles' | 'permissions' | null = null;

    if (/\/users(\/|\?|$)/.test(url)) {
      key = 'users';
    } else if (/\/roles(\/|\?|$)/.test(url)) {
      key = 'roles';
    } else if (/\/permissions(\/|\?|$)/.test(url)) {
      key = 'permissions';
    }

    if (key) {
      let entityCounter: { users: number; roles: number; permissions: number };
      const entityCounterStr = localStorage.getItem('entityCounter');
      if (entityCounterStr) {
        entityCounter = JSON.parse(entityCounterStr);
      } else {
        entityCounter = { users: 0, roles: 0, permissions: 0 };
      }
      entityCounter[key] = (entityCounter[key] || 0) + 1;
      localStorage.setItem('entityCounter', JSON.stringify(entityCounter));
    }
  }
}
