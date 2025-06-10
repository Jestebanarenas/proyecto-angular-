import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  showForm = false;
  editingUser: User | null = null;
  selectedUser: User | null = null; // Agregar esta propiedad
  newUser: User = { id: 0, name: '', email: '', password: '' };

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  // Agregar método openAddUser
  openAddUser(): void {
    this.showForm = true;
    this.editingUser = null;
    this.selectedUser = null;
    this.newUser = { id: 0, name: '', email: '', password: '' };
  }

  // Navegación a direcciones
  goToAddress(userId: number): void {
    this.router.navigate(['/seguridad/address', userId]);
  }

  // Navegación a contraseñas
  goToPasswords(userId: number): void {
    this.router.navigate(['/seguridad/passwords', userId]);
  }

  // Navegación a firma digital
  goToDigitalSignature(userId: number): void {
    this.router.navigate(['/seguridad/digital-signature', userId]);
  }

  // Navegación a dispositivos
  goToDevices(userId: number): void {
    this.router.navigate(['/seguridad/devices', userId]);
  }

  // Método para seleccionar usuario
  selectUser(user: User): void {
    this.selectedUser = user;
    this.showForm = true;
    this.editingUser = user;
    this.newUser = { ...user };
  }

  // Resto de métodos para CRUD de usuarios
  addUser(): void {
    this.showForm = true;
    this.editingUser = null;
    this.selectedUser = null;
    this.newUser = { id: 0, name: '', email: '', password: '' };
  }

  editUser(user: User): void {
    this.showForm = true;
    this.editingUser = user;
    this.selectedUser = user;
    this.newUser = { ...user };
  }

  saveUser(): void {
    if (this.editingUser) {
      this.userService.updateUser(this.editingUser.id, this.newUser).subscribe(() => {
        this.loadUsers();
        this.cancelForm();
      });
    } else {
      this.userService.createUser(this.newUser).subscribe(() => {
        this.loadUsers();
        this.cancelForm();
      });
    }
  }

  deleteUser(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  cancelForm(): void {
    this.showForm = false;
    this.editingUser = null;
    this.selectedUser = null;
    this.newUser = { id: 0, name: '', email: '', password: '' };
  }
}



