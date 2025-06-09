import { Component, OnInit } from '@angular/core';
import { SecurityQuestion } from 'src/app/models/securityquestion.model';
import { SecurityQuestionService } from 'src/app/services/securityquestion.service';

@Component({
  selector: 'app-security-question',
  templateUrl: './securityquestion.component.html',
  styleUrls: ['./securityquestion.component.scss']
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

    const question = { name: this.newQuestion };
    this.questionService.create(question).subscribe(() => {
      this.newQuestion = '';
      this.loadQuestions();
    });
  }

  // Puedes agregar métodos para editar/eliminar si lo necesitas
}
