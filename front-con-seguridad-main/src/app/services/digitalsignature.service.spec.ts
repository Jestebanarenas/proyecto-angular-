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

  it('should get my signature', () => {
    const mockSignature: DigitalSignature = {
      id: 1,
      signatureData: 'data:image/png;base64,...',
      createdAt: new Date(),
      user: { id: 1, email: 'test@test.com', password: '', enabled: true, username: '' }
    };

    service.getMySignature().subscribe(signature => {
      expect(signature).toEqual(mockSignature);
    });

    const req = httpMock.expectOne(`${apiUrl}/me`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSignature);
  });
});
