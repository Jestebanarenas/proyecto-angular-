import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';
import { Subscription } from 'rxjs';

declare const google: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  user: User;
  subscription: Subscription;
  userProfilePicture: string = 'assets/img/theme/team-4-800x800.jpg';

  constructor(location: Location,
    private element: ElementRef,
    private router: Router,
    private securityService: SecurityService) {
    this.location = location;
    this.subscription = this.securityService.getUser().subscribe(data => {
      this.user = data;
      // Si el usuario tiene un token de Google, intentar extraer la foto
      if (data && data.token && this.isGoogleToken(data.token)) {
        this.extractGoogleProfilePicture(data.token);
      }
    })
  }

  isGoogleToken(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.iss && (payload.iss.includes('accounts.google.com') || payload.iss.includes('googleapis.com'));
    } catch {
      return false;
    }
  }

  extractGoogleProfilePicture(token: string) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.picture) {
        this.userProfilePicture = payload.picture;
      }
    } catch (error) {
      console.error('Error extrayendo foto de perfil:', error);
    }
  }

  logout() {
    this.securityService.logout();
    
    // Logout de Google si está disponible
    if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
      google.accounts.id.disableAutoSelect();
    }
    
    // Resetear la foto de perfil
    this.userProfilePicture = 'assets/img/theme/team-4-800x800.jpg';
    
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }
}
