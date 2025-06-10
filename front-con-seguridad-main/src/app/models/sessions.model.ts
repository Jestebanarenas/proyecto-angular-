import { User } from './user.model';

export interface Sessions {
  id: number;
  user: User;              // Relación con User
  startTime: Date;         // Hora de inicio de sesión
  endTime?: Date;          // Hora de fin de sesión (opcional)
  device: string;          // Dispositivo desde el que se inició sesión
  ipAddress?: string;      // Dirección IP de la sesión (opcional)
  status: 'active' | 'inactive';  // Estado de la sesión
}
