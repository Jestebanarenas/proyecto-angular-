import { User } from './user.model';

export interface Sessions {
  id: string;
  FACode: string;
  created_at: string;
  expiration: string;
  state: 'active' | 'inactive';
  token: string;
  updated_at: string;
  user_id: number;
}
