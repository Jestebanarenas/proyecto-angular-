import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserAnswerService } from './answer.service';
import { UserAnswer } from '../models/answer.model';
import { environment } from 'src/environments/environment';

describe('UserAnswerService', () => {
  let service: UserAnswerService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/answers`;

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

    const req = httpMock.expectOne(`${apiUrl}/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAnswers);
  });

  it('should create an answer', () => {
    const userId = 1;
    const questionId = 2;
    const content = 'Mi respuesta';
    const newAnswer: UserAnswer = {
      id: 1,
      user_id: userId,
      security_question_id: questionId,
      content: content,
      created_at: new Date(),
      updated_at: new Date()
    };

    service.create(userId, questionId, content).subscribe(data => {
      expect(data).toEqual(newAnswer);
    });

    const req = httpMock.expectOne(`${apiUrl}/user/${userId}/question/${questionId}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ content });
    req.flush(newAnswer);
  });
});
