import { Component, OnInit } from '@angular/core';
import { SecurityQuestion } from 'src/app/models/securityquestion.model';
import { SecurityQuestionService } from 'src/app/services/securityquestion.service';

@Component({
  selector: 'app-security-question',
  templateUrl: './security-question.component.html',
  styleUrls: ['./security-question.component.scss']
})
export class SecurityQuestionComponent implements OnInit {
  questions: SecurityQuestion[] = [];
  newQuestion = '';
  isLoading = false;

  constructor(private questionService: SecurityQuestionService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.isLoading = true;
    this.questionService.getAll().subscribe(data => {
      this.questions = data;
      this.isLoading = false;
    });
  }

  addQuestion(): void {
    if (!this.newQuestion.trim()) return;

    const question: SecurityQuestion = {
      id: 0,
      question: this.newQuestion,
      isActive: true
    };

    this.questionService.create(question).subscribe(() => {
      this.newQuestion = '';
      this.loadQuestions();
    });
  }

  toggleStatus(q: SecurityQuestion): void {
    const updated = { ...q, isActive: !q.isActive };
    this.questionService.update(q.id, updated).subscribe(() => {
      q.isActive = updated.isActive;
    });
  }
}
