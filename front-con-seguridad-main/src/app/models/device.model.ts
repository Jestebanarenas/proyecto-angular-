import { User } from './user.model';

export interface Device {
  id: number;
  user_id: number;
  name: string;
  ip: string;
  operating_system?: string;
  created_at?: Date;
  updated_at?: Date;
}
