import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface PermissionActions {
  view: boolean;
  list: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
}

interface ModelPermission {
  name: string;
  permissions: PermissionActions;
}

@Component({
  selector: 'app-role-permission',
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.scss']
})
export class RolePermissionComponent implements OnInit {
  roleId?: number;
  models: ModelPermission[] = [
    { name: 'Users', permissions: { view: false, list: false, create: false, update: false, delete: false } },
    { name: 'Roles', permissions: { view: false, list: false, create: false, update: false, delete: false } },
    { name: 'Permissions', permissions: { view: false, list: false, create: false, update: false, delete: false } }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.roleId = params['roleId'];
      // Aquí puedes cargar los permisos actuales del rol desde el backend si lo deseas
    });
  }

  savePermissions() {
    // Aquí puedes enviar los permisos seleccionados al backend
    console.log('Permisos guardados:', this.models);
  }
}
