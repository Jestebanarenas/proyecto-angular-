import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionService } from '../../services/permission.service';

@Component({
  selector: 'app-permission-create',
  templateUrl: './permission-create.component.html',
  styleUrls: ['./permission-create.component.scss']
})
export class PermissionCreateComponent {
  permission = { url: '', method: 'GET' };

  constructor(private permissionService: PermissionService, private router: Router) {}

  createPermission() {
    this.permissionService.createPermission(this.permission).subscribe({
      next: () => this.router.navigate(['../permissions']),
      error: err => alert('Error al crear el permiso')
    });
  }
}
