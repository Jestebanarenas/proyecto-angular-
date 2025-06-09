import { Session } from './session.model';

export class User {
    id?: number;
    name?: string;
    email: string;
    password?: string;
    token?: string;
    sessions?: Session[]; // Relación 1 a N: un usuario tiene muchas sesiones
}
