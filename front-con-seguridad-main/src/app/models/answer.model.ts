import { User } from './user.model';
import { SecurityQuestion } from './securityquestion.model';

export interface UserAnswer {
  id: number;
  user_id: number;
  security_question_id: number;
  content: string;
  created_at?: Date;
  updated_at?: Date;
  // Relaciones opcionales
  user?: {
    id: number;
    name: string;
    email: string;
  };
  security_question?: {
    id: number;
    name: string;
    description?: string;
  };
}
