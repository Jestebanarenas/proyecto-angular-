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
  editingPermission: Permission | null = null; // <--- NUEVO

  constructor(
    private permissionService: PermissionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadPermissions();
  }

  loadPermissions(): void {
    this.permissionService.getAllPermissions().subscribe({
      next: (data) => {
        this.permissions = data;
      },
      error: (error) => {
        console.error('Error loading permissions:', error);
      }
    });
  }

  viewPermission(permission: Permission) {
    // Lógica para ver detalles
    alert(`View permission: ${permission.id}`);
  }

  updatePermission(permission: Permission) {
    // Mostrar el formulario de edición con los datos actuales
    this.editingPermission = { ...permission };
  }

  saveUpdate() {
    if (this.editingPermission) {
      this.permissionService.updatePermission(this.editingPermission.id, this.editingPermission).subscribe({
        next: () => {
          this.editingPermission = null;
          this.loadPermissions();
        },
        error: (error) => {
          console.error('Error updating permission:', error);
        }
      });
    }
  }

  cancelEdit() {
    this.editingPermission = null;
  }

  deletePermission(permission: Permission) {
    if (confirm('Are you sure you want to delete this permission?')) {
      this.permissionService.deletePermission(permission.id!).subscribe({
        next: () => {
          this.loadPermissions(); // Recargar la lista después de eliminar
        },
        error: (error) => {
          console.error('Error deleting permission:', error);
        }
      });
    }
  }

  addPermission() {
    // Navegar a la página de creación de permisos
    this.router.navigate(['create'], { relativeTo: this.route });
  }
}
