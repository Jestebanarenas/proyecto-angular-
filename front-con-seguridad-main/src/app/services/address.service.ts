import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../models/address.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = `${environment.url_api_base}/addresses`;

  constructor(private http: HttpClient) {}

  getAddressByUser(userId: number): Observable<Address> {
    return this.http.get<Address>(`${this.apiUrl}/user/${userId}`);
  }

  createAddress(userId: number, address: Address): Observable<Address> {
    return this.http.post<Address>(`${this.apiUrl}/user/${userId}`, address);
  }
}
