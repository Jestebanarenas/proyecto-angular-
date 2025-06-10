import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { UserService } from '../../services/user.service';
import { Profile } from '../../models/profile.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile?: Profile;
  user?: User;
  userId: number = 0;
  isEditing = false;
  newProfile = { phone: '' };
  selectedFile?: File;
  profileNotFound = false;

  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    if (this.userId) {
      this.loadUserAndProfile();
    }
  }

  loadUserAndProfile(): void {
    // Cargar información del usuario
    this.userService.getUser(this.userId).subscribe(
      user => {
        this.user = user;
      },
      error => {
        console.error('Error loading user:', error);
      }
    );

    // Cargar perfil del usuario
    this.profileService.getProfileByUserId(this.userId).subscribe(
      profile => {
        this.profile = profile;
        this.profileNotFound = false;
      },
      error => {
        if (error.status === 404) {
          this.profileNotFound = true;
          console.log('Profile not found, user can create one');
        } else {
          console.error('Error loading profile:', error);
        }
      }
    );
  }

  createProfile(): void {
    if (this.userId) {
      const defaultProfileData = { phone: '' };
      this.profileService.createProfile(this.userId, defaultProfileData).subscribe(
        profile => {
          this.profile = profile;
          this.profile.user = this.user; // Asignar la información del usuario
          this.profileNotFound = false;
        },
        error => {
          console.error('Error creating profile:', error);
        }
      );
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  updateProfile(): void {
    if (this.profile && this.profile.id) {
      this.profileService.updateProfile(this.profile.id, this.newProfile, this.selectedFile)
        .subscribe(
          updatedProfile => {
            this.profile = updatedProfile;
            this.profile.user = this.user; // Mantener la información del usuario
            this.isEditing = false;
            this.selectedFile = undefined;
          },
          error => console.error('Error updating profile:', error)
        );
    }
  }

  startEditing(): void {
    this.isEditing = true;
    this.newProfile = { phone: this.profile?.phone || '' };
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.selectedFile = undefined;
  }

  goBack(): void {
    this.router.navigate(['/seguridad/users']);
  }
}