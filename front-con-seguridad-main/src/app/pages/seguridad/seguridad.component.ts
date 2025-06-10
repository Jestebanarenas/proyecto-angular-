import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html',
  styleUrls: ['./seguridad.component.scss']
})
export class SeguridadComponent implements OnInit {
  activeTab = 'users';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Detectar cambios de ruta para actualizar el tab activo
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      if (url.includes('/users')) {
        this.activeTab = 'users';
      } else if (url.includes('/roles')) {
        this.activeTab = 'roles';
      } else if (url.includes('/permissions')) {
        this.activeTab = 'permissions';
      }
    });

    // Establecer el tab inicial basado en la URL actual
    const currentUrl = this.router.url;
    if (currentUrl.includes('/users')) {
      this.activeTab = 'users';
    } else if (currentUrl.includes('/roles')) {
      this.activeTab = 'roles';
    } else if (currentUrl.includes('/permissions')) {
      this.activeTab = 'permissions';
    }
  }

  navigate(tab: string) {
    this.activeTab = tab;
    this.router.navigate([tab], { relativeTo: this.route });
  }
}
