import { User } from './user.model';
import { SecurityQuestion } from './securityquestion.model';

export interface UserAnswer {
  id: number;
  user: User;
  question: SecurityQuestion;
  answer: string;
  createdAt: Date;
}
