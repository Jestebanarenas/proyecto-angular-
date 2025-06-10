import { User } from './user.model';
import { SecurityQuestion } from './securityquestion.model';

export interface UserAnswer {
  id: number;
  user_id: number;
  security_question_id: number;
  content: string;
  created_at?: Date;
  updated_at?: Date;
  question?: SecurityQuestion; // Relación opcional para mostrar la pregunta
  user?: User; // Relación opcional si el backend la retorna
}
