import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private apiUrl = `${environment.apiUrl}/device`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.apiUrl}/`);
  }

  getByUserId(userId: number): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.apiUrl}/user/${userId}`);
  }

  getById(id: number): Observable<Device> {
    return this.http.get<Device>(`${this.apiUrl}/${id}`);
  }

  create(user_id: number, device: { name: string; ip: string; operating_system?: string }): Observable<Device> {
    return this.http.post<Device>(`${this.apiUrl}/user/${user_id}`, device);
  }

  update(id: number, device: Partial<Device>): Observable<Device> {
    return this.http.put<Device>(`${this.apiUrl}/${id}`, device);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
