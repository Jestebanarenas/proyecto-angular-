import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
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
    this.selectedUser = { email: '', name: '', password: '' };
    this.isEditing = false;
  }

  openEditUser(user: User) {
    this.selectedUser = { ...user };
    this.isEditing = true;
  }

  saveUser() {
    if (this.selectedUser) {
      if (this.isEditing && this.selectedUser.id) {
        this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe(() => {
          this.getUsers();
          this.selectedUser = null;
        });
      } else {
        this.userService.createUser(this.selectedUser).subscribe(() => {
          this.getUsers();
          this.selectedUser = null;
        });
      }
    }
  }

  deleteUser(user: User) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(user.id!).subscribe(() => {
        this.getUsers();
      });
    }
  }

  viewUser(userId: number) {
    this.router.navigate(['users', userId, 'view'], { relativeTo: this.route });
  }

  goToProfile(userId: number) {
    this.router.navigate(['/user-profile', userId]);
  }

  goToAddress(userId: number) {
    this.router.navigate(['../address', userId], { relativeTo: this.route });
  }

  goToDigitalSignature(userId: number) {
    this.router.navigate(['/digital-signature', userId]);
  }

  goToDevices(userId: number) {
    this.router.navigate(['/devices', userId]);
  }

  goToPasswords(userId: number) {
    this.router.navigate(['/seguridad/passwords', userId]);
  }

  goToSessions(userId: number) {
    this.router.navigate(['/sessions', userId]);
  }
}



