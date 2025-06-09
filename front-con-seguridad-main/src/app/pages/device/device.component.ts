import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/models/device.model';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
  devices: Device[] = [];
  newDevice: { name: string; ip: string; operating_system: string } = { name: '', ip: '', operating_system: '' };
  user_id: number = 1; // Ajustar a contexto real

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.loadDevices();
  }

  loadDevices(): void {
    this.deviceService.getByUserId(this.user_id).subscribe((data) => {
      this.devices = data;
    });
  }

  addDevice(): void {
    if (!this.newDevice.name || !this.newDevice.ip) return;
    this.deviceService.create(this.user_id, this.newDevice).subscribe(() => {
      this.newDevice = { name: '', ip: '', operating_system: '' };
      this.loadDevices();
    });
  }
}
