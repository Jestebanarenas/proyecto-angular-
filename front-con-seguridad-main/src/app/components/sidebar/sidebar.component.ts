import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';
import { User } from 'src/app/models/user.model';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    type: number; // 0: No logueado, 1: Logueado, 2: No importa, 3: Solo admin
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '', type: 2 },
    { path: '/icons', title: 'Icons', icon: 'ni-planet text-blue', class: '', type: 1 },
    { path: '/maps', title: 'Maps', icon: 'ni-pin-3 text-orange', class: '', type: 1 },
    { path: '/user-profile', title: 'User profile', icon: 'ni-single-02 text-yellow', class: '', type: 1 },
    { path: '/tables', title: 'Tables', icon: 'ni-bullet-list-67 text-red', class: '', type: 1 },
    { path: '/login', title: 'Login', icon: 'ni-key-25 text-info', class: '', type: 0 },
    { path: '/register', title: 'Register', icon: 'ni-circle-08 text-pink', class: '', type: 0 },
    { path: '/theaters/list', title: 'Teatros', icon: 'ni-circle-08 text-pink', class: '', type: 1 },
    { path: '/security-questions', title: 'Preguntas de Seguridad', icon: 'ni-chat-round text-purple', class: '', type: 3 }, // CAMBIO: Solo admin
    { path: '/answers/1', title: 'Mis Respuestas', icon: 'ni-check-bold text-success', class: '', type: 3 }, // CAMBIO: Solo admin
    { path: '/seguridad', title: 'Administración', icon: 'ni-lock-circle-open text-danger', class: '', type: 3 } // Solo admin
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  user: User;

  constructor(
    private router: Router,
    private securityService: SecurityService
  ) { 
    this.securityService.getUser().subscribe(data => {
      this.user = data;
      console.log('Usuario en sidebar:', data); // Para debug
      this.filterMenuItems();
    });
  }

  ngOnInit() {
    this.filterMenuItems();
    this.router.events.subscribe(() => {
      this.isCollapsed = true;
    });
  }

  filterMenuItems() {
    const isLoggedIn = this.securityService.existSession();
    const isAdmin = this.isAdminUser();
    
    console.log('Filtrando menú - Logueado:', isLoggedIn, 'Admin:', isAdmin);
    
    this.menuItems = ROUTES.filter(menuItem => {
      if (menuItem.type === 0 && isLoggedIn) return false; // Login/Register solo si no está logueado
      if (menuItem.type === 1 && !isLoggedIn) return false; // Opciones de usuario solo si está logueado
      if (menuItem.type === 3 && !isAdmin) return false; // Opciones de admin solo si es admin
      return true;
    });
    
    console.log('Items de menú filtrados:', this.menuItems.length);
  }

  private isAdminUser(): boolean {
    if (!this.user || !this.user.email) {
      console.log('No hay usuario o email');
      return false;
    }
    
    // Lista de emails autorizados como admin (MISMA QUE EN AdminGuard)
    const adminEmails = [
      'admin@gmail.com',
      'tu-email@gmail.com', // Reemplaza con tu email real
      'xmaxt@ejemplo.com', // Ejemplo, cambia por tu email
      'juan.ballesteros30224@ucaldas.edu.co' // Agrega tu email real aquí
      // Agrega más emails aquí según necesites
    ];
    
    const isAdmin = adminEmails.includes(this.user.email) || this.user.email.endsWith('@admin.com');
    console.log('Verificando admin para:', this.user.email, 'Resultado:', isAdmin);
    
    return isAdmin;
  }
}
