import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../services/address.service';
import { Address } from '../../models/address.model';
import { ActivatedRoute } from '@angular/router';

declare const google: any;

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  address: Address = { street: '', number: '' };
  userId: number = 1;

  constructor(
    private addressService: AddressService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = +(params.get('id') || 1);
      this.loadAddress();
    });
  }

  loadAddress() {
    this.addressService.getAddressByUser(this.userId).subscribe({
      next: (addr) => {
        this.address = addr;
        setTimeout(() => this.initMap(), 100); // Espera a que el DOM esté listo
      },
      error: () => {
        this.address = { street: '', number: '' };
      }
    });
  }

  createAddress() {
    this.addressService.createAddress(this.userId, this.address).subscribe(addr => {
      this.address = addr;
      setTimeout(() => this.initMap(), 100);
    });
  }

  initMap() {
    if (this.address.latitude && this.address.longitude) {
      const mapDiv = document.getElementById('map-canvas');
      const myLatlng = new google.maps.LatLng(this.address.latitude, this.address.longitude);
      const map = new google.maps.Map(mapDiv, {
        zoom: 15,
        center: myLatlng
      });
      new google.maps.Marker({
        position: myLatlng,
        map: map
      });
    }
  }
}
