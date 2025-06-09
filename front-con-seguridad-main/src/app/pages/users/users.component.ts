import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null; // Para manejar el usuario seleccionado
  isEditing: boolean = false; // Indica si estamos en modo edición

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  openAddUser() {
    this.selectedUser = { id: null, name: '', email: '', password: '' }; // Usuario vacío para agregar
    this.isEditing = false;
  }

  openEditUser(user: User) {
    this.selectedUser = { ...user, password: '' }; // Clonar el usuario seleccionado y agregar la propiedad password
    this.isEditing = true;
  }

  saveUser() {
    if (this.selectedUser) {
      const userToSend = { ...this.selectedUser };
      if (!userToSend.password) {
        delete userToSend.password; // Elimina la propiedad si está vacía
      }

      if (this.isEditing) {
        this.userService.updateUser(userToSend.id!, userToSend).subscribe(() => {
          this.getUsers(); // Refrescar la lista de usuarios
          this.selectedUser = null; // Limpiar el usuario seleccionado
        }, error => {
          console.error('Error updating user:', error);
        });
      } else {
        this.userService.createUser(userToSend).subscribe(() => {
          this.getUsers(); // Refrescar la lista de usuarios
          this.selectedUser = null; // Limpiar el usuario seleccionado
        }, error => {
          console.error('Error creating user:', error);
        });
      }
    }
  }

  deleteUser(user: User) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(user.id!).subscribe(() => {
        this.getUsers(); // Refrescar la lista de usuarios
      }, error => {
        console.error('Error deleting user:', error);
      });
    }
  }
  goToAddress(userId: number) {
    this.router.navigate(['../address', userId], { relativeTo: this.route });
  }
  goToPasswords(userId: number) {
    this.router.navigate(['/seguridad/passwords', userId]);
  }
  goToProfile(userId: number) {
    this.router.navigate(['../profile', userId], { relativeTo: this.route });
  }
}



