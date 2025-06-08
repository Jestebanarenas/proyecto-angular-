import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SecurityQuestionService } from './securityquestion.service';
import { SecurityQuestion } from '../models/securityquestion.model';
import { environment } from 'src/environments/environment';

describe('SecurityQuestionService', () => {
  let service: SecurityQuestionService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/security-question`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SecurityQuestionService]
    });

    service = TestBed.inject(SecurityQuestionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all security questions', () => {
    const mockQuestions: SecurityQuestion[] = [
      { id: 1, question: '¿Color favorito?', isActive: true }
    ];

    service.getAll().subscribe(data => {
      expect(data).toEqual(mockQuestions);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockQuestions);
  });

  it('should create a new question', () => {
    const newQuestion: SecurityQuestion = {
      id: 2,
      question: '¿Nombre de tu mascota?',
      isActive: true
    };

    service.create(newQuestion).subscribe(data => {
      expect(data).toEqual(newQuestion);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newQuestion);
  });
});
