import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PermissionService, Permission } from '../../services/permission.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {
  permissions: Permission[] = [];

  constructor(
    private permissionService: PermissionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.permissionService.getAllPermissions().subscribe(data => {
      this.permissions = data;
    });
  }

  viewPermission(permission: Permission) {
    // Lógica para ver detalles
    alert(`View permission: ${permission.id}`);
  }

  updatePermission(permission: Permission) {
    // Lógica para actualizar
    alert(`Update permission: ${permission.id}`);
  }

  deletePermission(permission: Permission) {
    // Lógica para eliminar
    if (confirm('Are you sure you want to delete this permission?')) {
      this.permissionService.deletePermission(permission.id).subscribe(() => {
        this.permissions = this.permissions.filter(p => p.id !== permission.id);
      });
    }
  }

  addPermission() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }
}
