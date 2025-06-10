import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SessionService } from './sessions.service';
import { Sessions } from '../models/sessions.model';
import { environment } from 'src/environments/environment';

describe('SessionService', () => {
  let service: SessionService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/sessions`;  // La URL base de la API

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SessionService]
    });

    service = TestBed.inject(SessionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();  // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve sessions by user ID', () => {
    const mockSessions: Sessions[] = [
      { id: 1, user: { id: 1, email: 'user1@example.com', password: '' }, startTime: new Date(), device: 'Desktop', status: 'active' },
      { id: 2, user: { id: 2, email: 'user2@example.com', password: '' }, startTime: new Date(), device: 'Mobile', status: 'inactive' }
    ];

    service.getSessionsByUserId(1).subscribe((sessions) => {
      expect(sessions.length).toBe(2);
      expect(sessions).toEqual(mockSessions);
    });

    const req = httpMock.expectOne(`${apiUrl}/user/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSessions);  // Se devuelve la respuesta mockeada
  });

  it('should create a new session', () => {
    const newSession: Sessions = {
      id: 3,
      user: { id: 1, email: 'user1@example.com', password: '' },
      startTime: new Date(),
      device: 'Tablet',
      status: 'active'
    };

    service.createSession(newSession).subscribe((session) => {
      expect(session).toEqual(newSession);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newSession);  // Mock de la respuesta al crear la sesión
  });

  it('should end a session', () => {
    const sessionId = 1;

    service.endSession(sessionId).subscribe(() => {
      expect(true).toBeTrue();  // Si se ejecuta sin errores, la prueba pasa
    });

    const req = httpMock.expectOne(`${apiUrl}/${sessionId}/end`);
    expect(req.request.method).toBe('PUT');
    req.flush({});  // Mock de la respuesta vacía al finalizar la sesión
  });

  it('should delete a session', () => {
    const sessionId = 1;

    service.deleteSession(sessionId).subscribe(() => {
      expect(true).toBeTrue();  // Si se ejecuta sin errores, la prueba pasa
    });

    const req = httpMock.expectOne(`${apiUrl}/${sessionId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});  // Mock de la respuesta vacía al eliminar la sesión
  });
});
