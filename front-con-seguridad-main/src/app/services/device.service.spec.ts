import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DeviceService } from './device.service';
import { Device } from '../models/device.model';
import { environment } from 'src/environments/environment';

describe('DeviceService', () => {
  let service: DeviceService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/device`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeviceService]
    });

    service = TestBed.inject(DeviceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve devices by user ID', () => {
    const mockDevices: Device[] = [
      {
        id: 1,
        user_id: 1,
        name: 'Laptop',
        ip: '192.168.1.1',
        operating_system: 'Windows',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    service.getByUserId(1).subscribe(data => {
      expect(data).toEqual(mockDevices);
    });

    const req = httpMock.expectOne(`${apiUrl}/user/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockDevices);
  });

  it('should create a new device', () => {
    const userId = 1;
    const devicePayload = {
      name: 'Phone',
      ip: '10.0.0.1',
      operating_system: 'Android'
    };
    const createdDevice: Device = {
      id: 2,
      user_id: userId,
      name: 'Phone',
      ip: '10.0.0.1',
      operating_system: 'Android',
      created_at: new Date(),
      updated_at: new Date()
    };

    service.create(userId, devicePayload).subscribe(data => {
      expect(data).toEqual(createdDevice);
    });

    const req = httpMock.expectOne(`${apiUrl}/user/${userId}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(devicePayload);
    req.flush(createdDevice);
  });
});
