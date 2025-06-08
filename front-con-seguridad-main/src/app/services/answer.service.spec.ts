import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserAnswerService } from './answer.service';
import { UserAnswer } from '../models/answer.model';
import { environment } from 'src/environments/environment';

describe('UserAnswerService', () => {
  let service: UserAnswerService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/user-answer`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserAnswerService]
    });

    service = TestBed.inject(UserAnswerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all answers', () => {
    const mockAnswers: UserAnswer[] = [];

    service.getAll().subscribe(data => {
      expect(data).toEqual(mockAnswers);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockAnswers);
  });

  it('should create an answer', () => {
    const newAnswer: UserAnswer = {
      id: 1,
      answer: 'Mi respuesta',
      createdAt: new Date(),
      user: { id: 1, email: '', password: '', username: '', enabled: true },
      question: { id: 1, question: 'Pregunta?', isActive: true }
    };

    service.create(newAnswer).subscribe(data => {
      expect(data).toEqual(newAnswer);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newAnswer);
  });
});
