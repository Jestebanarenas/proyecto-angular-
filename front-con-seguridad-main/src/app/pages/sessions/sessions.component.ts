import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/sessions.service';
import { UserService } from 'src/app/services/user.service';  // Si necesitas mostrar datos del usuario
import { Sessions } from 'src/app/models/sessions.model';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  sessions: Sessions[] = [];
  userId!: number;
  user: User = { id: 1, email: 'user@example.com', password: '' }; // Ajusta según el contexto

  constructor(
    private sessionService: SessionService,
    private userService: UserService,  // Si necesitas datos adicionales del usuario
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.user.id = this.userId;
    this.loadSessions();
  }

  // Cargar las sesiones del usuario
  loadSessions(): void {
    this.sessionService.getSessionsByUserId(this.userId).subscribe(
      (data: Sessions[]) => {
        console.log('Sessions data received:', data); // Para debugging
        this.sessions = data;
      },
      (error) => {
        console.error('Error loading sessions:', error);
        this.sessions = [];
      }
    );
  }

  // Crear una nueva sesión (por ejemplo, al hacer login)
  startSession(): void {
    const newSession: Sessions = {
      id: '',
      FACode: '123456',
      created_at: new Date().toISOString(),
      expiration: '2024-12-31T23:59:59Z',
      state: 'active',
      token: '',
      updated_at: new Date().toISOString(),
      user_id: this.userId
    };

    this.sessionService.createSession(this.userId, newSession).subscribe(
      () => {
        console.log('Session created successfully');
        this.loadSessions();
      },
      (error) => {
        console.error('Error creating session:', error);
      }
    );
  }

  // Terminar sesión
  endSession(sessionId: string): void {
    this.sessionService.endSession(sessionId).subscribe(
      (updatedSession) => {
        console.log('Session ended successfully:', updatedSession);
        this.loadSessions(); // Recargar las sesiones para ver el cambio
      },
      (error) => {
        console.error('Error ending session:', error);
        // Mostrar el error específico
        if (error.status === 404) {
          console.error('Session not found or endpoint does not exist');
        }
      }
    );
  }
}
