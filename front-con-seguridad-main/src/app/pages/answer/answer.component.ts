import { Component, OnInit } from '@angular/core';
import { UserAnswer } from 'src/app/models/answer.model';
import { SecurityQuestion } from 'src/app/models/securityquestion.model';
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
  editingAnswer: UserAnswer | null = null;

  constructor(
    private userAnswerService: UserAnswerService,
    private questionService: SecurityQuestionService
  ) {}

  ngOnInit(): void {
    this.loadQuestions();
    this.loadUserAnswers();
  }

  loadQuestions(): void {
    this.questionService.getAll().subscribe({
      next: (data) => {
        this.questions = data;
      },
      error: (error) => {
        console.error('Error loading questions:', error);
      }
    });
  }

  loadUserAnswers(): void {
    this.userAnswerService.getByUserId(this.userId).subscribe({
      next: (data) => {
        this.userAnswers = data;
      },
      error: (error) => {
        console.error('Error loading user answers:', error);
      }
    });
  }

  saveAnswer(): void {
    if (!this.selectedQuestionId || !this.answerText.trim()) {
      alert('Por favor selecciona una pregunta y escribe una respuesta');
      return;
    }

    if (this.editingAnswer) {
      // Update
      this.userAnswerService.update(this.editingAnswer.id, this.answerText)
        .subscribe({
          next: () => {
            this.resetForm();
            this.loadUserAnswers();
          },
          error: (error) => {
            console.error('Error updating answer:', error);
          }
        });
    } else {
      // Create
      this.userAnswerService.create(this.userId, this.selectedQuestionId, this.answerText)
        .subscribe({
          next: () => {
            this.resetForm();
            this.loadUserAnswers();
          },
          error: (error) => {
            console.error('Error creating answer:', error);
          }
        });
    }
  }

  editAnswer(answer: UserAnswer): void {
    this.editingAnswer = answer;
    this.selectedQuestionId = answer.security_question_id;
    this.answerText = answer.content;
  }

  deleteAnswer(answer: UserAnswer): void {
    if (confirm('¿Seguro que deseas eliminar esta respuesta?')) {
      this.userAnswerService.delete(answer.id).subscribe({
        next: () => {
          this.loadUserAnswers();
        },
        error: (error) => {
          console.error('Error deleting answer:', error);
        }
      });
    }
  }

  resetForm(): void {
    this.editingAnswer = null;
    this.selectedQuestionId = null;
    this.answerText = '';
  }
}