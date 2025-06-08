import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = 'http://127.0.0.1:5000/api/addresses';

  constructor(private http: HttpClient) {}

  getAddressByUser(userId: number): Observable<Address> {
    return this.http.get<Address>(`${this.apiUrl}/user/${userId}`);
  }

  createAddress(userId: number, address: Address): Observable<Address> {
    return this.http.post<Address>(`${this.apiUrl}/user/${userId}`, address);
  }
}
