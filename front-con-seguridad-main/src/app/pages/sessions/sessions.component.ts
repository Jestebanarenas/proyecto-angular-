import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/sessions.service';
import { UserService } from 'src/app/services/user.service';  // Si necesitas mostrar datos del usuario
import { Sessions } from 'src/app/models/sessions.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  sessions: Sessions[] = [];
  user: User = { id: 1, email: 'user@example.com', password: '' }; // Ajusta según el contexto

  constructor(
    private sessionService: SessionService,
    private userService: UserService  // Si necesitas datos adicionales del usuario
  ) {}

  ngOnInit(): void {
    this.loadSessions();
  }

  // Cargar las sesiones del usuario
  loadSessions(): void {
    this.sessionService.getSessionsByUserId(this.user.id).subscribe((data: Sessions[]) => {
      this.sessions = data;
    });
  }

  // Crear una nueva sesión (por ejemplo, al hacer login)
  startSession(): void {
    const newSession: Sessions = {
      id: 0,
      user: this.user,
      startTime: new Date(),
      device: 'Desktop',  // O usa un servicio para obtener el dispositivo real
      status: 'active',
    };

    this.sessionService.createSession(newSession).subscribe(() => {
      this.loadSessions();
    });
  }

  // Terminar sesión
  endSession(sessionId: number): void {
    this.sessionService.endSession(sessionId).subscribe(() => {
      this.loadSessions();
    });
  }
}
