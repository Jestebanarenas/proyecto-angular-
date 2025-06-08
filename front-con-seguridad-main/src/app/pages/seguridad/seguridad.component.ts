import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html',
  styleUrls: ['./seguridad.component.scss'] // <-- debe ser .scss
})
export class SeguridadComponent {
  activeTab = 'users';

  constructor(private router: Router, private route: ActivatedRoute) {}

  navigate(tab: string) {
    this.activeTab = tab;
    this.router.navigate([tab], { relativeTo: this.route });
  }
}
