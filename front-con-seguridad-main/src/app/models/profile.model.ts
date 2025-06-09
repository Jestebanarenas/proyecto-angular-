import { User } from './user.model';

export class Profile {
  id: number;
  phone: string;
  photo: string;
  user?: User;
}
