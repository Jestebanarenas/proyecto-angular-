import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ProfileService } from '../../services/profile.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  isEditing: boolean = false;
  showForm = false;
  editingUser: User | null = null;
  newUser: User = { id: 0, name: '', email: '', password: '' };

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  loadUsers(): void {
    this.getUsers();
  }

  openAddUser(): void {
    this.selectedUser = { id: null, name: '', email: '', password: '' };
    this.isEditing = false;
    this.showForm = true;
    this.editingUser = null;
    this.newUser = { id: 0, name: '', email: '', password: '' };
  }

  openEditUser(user: User): void {
    this.selectedUser = { ...user, password: '' };
    this.isEditing = true;
    this.showForm = true;
    this.editingUser = user;
    this.newUser = { ...user };
  }

  editUser(user: User): void {
    this.openEditUser(user);
  }

  saveUser(): void {
    if (this.selectedUser) {
      const userToSend = { ...this.selectedUser };
      if (!userToSend.password) {
        delete userToSend.password;
      }

      if (this.isEditing) {
        this.userService.updateUser(userToSend.id!, userToSend).subscribe(() => {
          this.getUsers();
          this.cancelForm();
        }, error => {
          console.error('Error updating user:', error);
        });
      } else {
        // Crear usuario y luego crear perfil automáticamente
        this.userService.createUser(userToSend).subscribe((newUser) => {
          console.log('User created:', newUser);
          
          // Crear perfil automáticamente después de crear el usuario
          this.createDefaultProfile(newUser.id);
          
          this.getUsers();
          this.cancelForm();
        }, error => {
          console.error('Error creating user:', error);
        });
      }
    }

    // Método alternativo usando newUser
    if (this.editingUser && !this.selectedUser) {
      this.userService.updateUser(this.editingUser.id, this.newUser).subscribe(() => {
        this.loadUsers();
        this.cancelForm();
      });
    } else if (!this.editingUser && !this.selectedUser) {
      this.userService.createUser(this.newUser).subscribe(() => {
        this.loadUsers();
        this.cancelForm();
      });
    }
  }

  private createDefaultProfile(userId: number): void {
    // Crear un perfil vacío por defecto
    const defaultProfileData = { phone: '' };
    
    this.profileService.createProfile(userId, defaultProfileData).subscribe(
      (profile) => {
        console.log('Default profile created:', profile);
      },
      (error) => {
        console.error('Error creating default profile:', error);
        // No es crítico si falla, pero es bueno saberlo
      }
    );
  }

  deleteUser(user: User): void;
  deleteUser(id: number): void;
  deleteUser(userOrId: User | number): void {
    const userId = typeof userOrId === 'number' ? userOrId : userOrId.id!;
    const message = '¿Estás seguro de que quieres eliminar este usuario?';
    
    if (confirm(message)) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.getUsers();
      }, error => {
        console.error('Error deleting user:', error);
      });
    }
  }

  cancelForm(): void {
    this.showForm = false;
    this.editingUser = null;
    this.selectedUser = null;
    this.isEditing = false;
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

  // Navegación a respuestas de seguridad
  goToAnswers(userId: number): void {
    this.router.navigate(['/answers', userId]);
  }

  // Navegación a roles
  goToRoles(userId: number): void {
    this.router.navigate(['/seguridad/user-role', userId]);
  }

  // Navegación a perfil
  goToProfile(userId: number): void {
    this.router.navigate(['/seguridad/profile', userId]);
  }

  // Navegación a sesiones
  goToSessions(userId: number) {
    this.router.navigate(['/seguridad/sessions', userId]);
  }

  // Método para seleccionar usuario
  selectUser(user: User): void {
    this.openEditUser(user);
  }

  // Método adicional para agregar usuario
  addUser(): void {
    this.openAddUser();
  }
}



