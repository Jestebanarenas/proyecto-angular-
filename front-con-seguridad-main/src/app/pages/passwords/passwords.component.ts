import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasswordService } from '../../services/password.service';
import { Password } from '../../models/password.model';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.scss']
})
export class PasswordsComponent implements OnInit {
  userId: number = 0;
  passwords: Password[] = [];
  selectedPassword: Password | null = null;
  isEditing: boolean = false;

  constructor(
    private passwordService: PasswordService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = +(params.get('id') || 0);
      this.loadPasswords();
    });
  }

  loadPasswords() {
    this.passwordService.getPasswordsByUser(this.userId).subscribe(data => {
      this.passwords = data;
    });
  }

  openAddPassword() {
    this.selectedPassword = { content: '', startAt: '', endAt: '' };
    this.isEditing = false;
  }

  openEditPassword(password: Password) {
    this.selectedPassword = { ...password, content: '' }; // No mostrar hash
    this.isEditing = true;
  }

  savePassword() {
    if (this.selectedPassword) {
      if (this.isEditing && this.selectedPassword.id) {
        this.passwordService.updatePassword(this.selectedPassword.id, this.selectedPassword).subscribe(() => {
          this.loadPasswords();
          this.selectedPassword = null;
        });
      } else {
        this.passwordService.createPassword(this.userId, this.selectedPassword).subscribe(() => {
          this.loadPasswords();
          this.selectedPassword = null;
        });
      }
    }
  }

  cancel() {
    this.selectedPassword = null;
  }
}
