import { User } from './user.model';

export interface Device {
  id: number;
  deviceName: string;
  deviceType: string; // Ej: 'mobile', 'desktop', 'tablet'
  ipAddress?: string;
  lastAccess?: Date;
  user: User;
}
