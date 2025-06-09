import { Component, OnInit } from '@angular/core';
import { UserAnswer } from 'src/app/models/answer.model';
import { SecurityQuestion } from 'src/app/models/securityquestion.model';
import { User } from 'src/app/models/user.model';
import { UserAnswerService } from 'src/app/services/answer.service';
import { SecurityQuestionService } from 'src/app/services/securityquestion.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  userAnswers: UserAnswer[] = [];
  questions: SecurityQuestion[] = [];
  selectedQuestionId: number | null = null;
  answerText: string = '';
  userId: number = 1; // temporal, reemplazar con user real

  constructor(
    private userAnswerService: UserAnswerService,
    private questionService: SecurityQuestionService
  ) {}

  ngOnInit(): void {
    this.loadQuestions();
    this.loadUserAnswers();
  }

  loadQuestions(): void {
    this.questionService.getAll().subscribe((data) => {
      this.questions = data;
    });
  }

  loadUserAnswers(): void {
    this.userAnswerService.getByUserId(this.userId).subscribe((data) => {
      this.userAnswers = data;
    });
  }

  saveAnswer(): void {
    if (!this.selectedQuestionId || !this.answerText.trim()) return;
    this.userAnswerService.create(this.userId, this.selectedQuestionId, this.answerText)
      .subscribe(() => {
        this.answerText = '';
        this.selectedQuestionId = null;
        this.loadUserAnswers();
      });
  }
}
