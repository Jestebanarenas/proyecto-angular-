import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = +(params.get('id') || 0);
      if (this.userId) {
        this.loadPasswords();
      }
    });
  }

  loadPasswords() {
    this.passwordService.getPasswordsByUser(this.userId).subscribe({
      next: (data) => {
        this.passwords = data.map(password => ({
          ...password,
          startAt: this.formatDateForDisplay(password.startAt),
          endAt: password.endAt ? this.formatDateForDisplay(password.endAt) : ''
        }));
      },
      error: (error) => {
        console.error('Error loading passwords:', error);
      }
    });
  }

  openAddPassword() {
    const now = new Date();
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + 3); // 3 months from now

    this.selectedPassword = { 
      content: '', 
      startAt: this.formatDateTimeLocal(now),
      endAt: this.formatDateTimeLocal(futureDate)
    };
    this.isEditing = false;
  }

  openEditPassword(password: Password) {
    this.selectedPassword = { 
      ...password, 
      content: '', // No mostrar hash
      startAt: this.convertToDateTimeLocal(password.startAt || ''),
      endAt: password.endAt ? this.convertToDateTimeLocal(password.endAt) : ''
    };
    this.isEditing = true;
  }

  savePassword() {
    if (!this.selectedPassword) return;

    if (!this.selectedPassword.content?.trim()) {
      alert('Please enter a password');
      return;
    }

    // Convertir fechas del formato datetime-local al formato que espera el backend
    const passwordToSend = {
      ...this.selectedPassword,
      startAt: this.convertToBackendFormat(this.selectedPassword.startAt || ''),
      endAt: this.selectedPassword.endAt ? this.convertToBackendFormat(this.selectedPassword.endAt) : undefined
    };

    if (this.isEditing && this.selectedPassword.id) {
      this.passwordService.updatePassword(this.selectedPassword.id, passwordToSend).subscribe({
        next: () => {
          this.loadPasswords();
          this.selectedPassword = null;
        },
        error: (error) => {
          console.error('Error updating password:', error);
          alert('Error updating password. Please try again.');
        }
      });
    } else {
      this.passwordService.createPassword(this.userId, passwordToSend).subscribe({
        next: () => {
          this.loadPasswords();
          this.selectedPassword = null;
        },
        error: (error) => {
          console.error('Error creating password:', error);
          alert('Error creating password. Please try again.');
        }
      });
    }
  }

  deletePassword(password: Password) {
    if (confirm('Are you sure you want to delete this password?')) {
      this.passwordService.deletePassword(password.id!).subscribe({
        next: () => {
          this.loadPasswords();
        },
        error: (error) => {
          console.error('Error deleting password:', error);
          alert('Error deleting password. Please try again.');
        }
      });
    }
  }

  cancel() {
    this.selectedPassword = null;
  }

  goBack() {
    this.router.navigate(['/seguridad/users']);
  }

  // Convertir de formato datetime-local (2025-06-08T21:17) al formato backend (2025-06-08 21:17:00)
  private convertToBackendFormat(dateTimeLocal: string): string {
    if (!dateTimeLocal) return '';
    
    // Si ya está en el formato correcto, devolverlo
    if (dateTimeLocal.includes(' ')) return dateTimeLocal;
    
    // Convertir de 2025-06-08T21:17 a 2025-06-08 21:17:00
    const [datePart, timePart] = dateTimeLocal.split('T');
    const timeWithSeconds = timePart.length === 5 ? `${timePart}:00` : timePart;
    return `${datePart} ${timeWithSeconds}`;
  }

  // Convertir del formato backend al formato datetime-local para inputs
  private convertToDateTimeLocal(backendDate: string): string {
    if (!backendDate) return '';
    
    // Si ya está en formato datetime-local, devolverlo
    if (backendDate.includes('T')) return backendDate.substring(0, 16);
    
    // Convertir de "2025-06-08 21:17:00" a "2025-06-08T21:17"
    const [datePart, timePart] = backendDate.split(' ');
    const timeWithoutSeconds = timePart ? timePart.substring(0, 5) : '00:00';
    return `${datePart}T${timeWithoutSeconds}`;
  }

  // Formatear fecha para mostrar en la tabla
  private formatDateForDisplay(dateString: string | undefined): string {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch {
      return dateString;
    }
  }

  // Formatear fecha actual para input datetime-local
  private formatDateTimeLocal(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
}
