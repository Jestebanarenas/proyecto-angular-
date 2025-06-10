import { TestBed } from '@angular/core/testing';
import { DigitalSignatureService } from './digitalsignature.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DigitalSignature } from '../models/digitalsignature.model';
import { environment } from 'src/environments/environment';

describe('DigitalSignatureService', () => {
  let service: DigitalSignatureService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/digital-signature`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DigitalSignatureService]
    });

    service = TestBed.inject(DigitalSignatureService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get signature by user ID', () => {
    const mockSignature: DigitalSignature = {
      id: 1,
      user_id: 1,
      photo: 'signatures/1.png',
      created_at: new Date(),
      updated_at: new Date()
    };

    service.getByUserId(1).subscribe(signature => {
      expect(signature).toEqual(mockSignature);
    });

    const req = httpMock.expectOne(`${apiUrl}/user/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSignature);
  });

  it('should create a new signature', () => {
    const userId = 1;
    const file = new File(['dummy'], 'signature.png', { type: 'image/png' });
    const mockSignature: DigitalSignature = {
      id: 2,
      user_id: userId,
      photo: 'signatures/2.png',
      created_at: new Date(),
      updated_at: new Date()
    };

    service.create(userId, file).subscribe(signature => {
      expect(signature).toEqual(mockSignature);
    });

    const req = httpMock.expectOne(`${apiUrl}/user/${userId}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body instanceof FormData).toBeTrue();
    req.flush(mockSignature);
  });
});
