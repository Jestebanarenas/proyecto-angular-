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

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
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
    this.selectedUser = { id: null, name: '', email: '', password: '' };
    this.isEditing = false;
  }

  openEditUser(user: User) {
    this.selectedUser = { ...user, password: '' };
    this.isEditing = true;
  }

  saveUser() {
    if (this.selectedUser) {
      const userToSend = { ...this.selectedUser };
      if (!userToSend.password) {
        delete userToSend.password;
      }

      if (this.isEditing) {
        this.userService.updateUser(userToSend.id!, userToSend).subscribe(() => {
          this.getUsers();
          this.selectedUser = null;
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
          this.selectedUser = null;
        }, error => {
          console.error('Error creating user:', error);
        });
      }
    }
  }

  private createDefaultProfile(userId: number) {
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

  deleteUser(user: User) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(user.id!).subscribe(() => {
        this.getUsers();
      }, error => {
        console.error('Error deleting user:', error);
      });
    }
  }

  goToAddress(userId: number) {
    this.router.navigate(['../address', userId], { relativeTo: this.route });
  }

  goToRoles(userId: number) {
    this.router.navigate(['/seguridad/user-role', userId]);
  }

  goToPasswords(userId: number) {
    this.router.navigate(['/seguridad/passwords', userId]);
  }

  goToProfile(userId: number) {
    this.router.navigate(['../profile', userId], { relativeTo: this.route });
  }
}



