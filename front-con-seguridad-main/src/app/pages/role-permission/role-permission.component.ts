import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RolePermissionService } from '../../services/role-permission.service';
import { PermissionService, Permission } from '../../services/permission.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role.model';

interface PermissionWithSelected extends Permission {
  selected?: boolean;
}

@Component({
  selector: 'app-role-permission',
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.scss']
})
export class RolePermissionComponent implements OnInit {
  roleId: number = 0;
  selectedRole: Role | null = null;
  permissions: PermissionWithSelected[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private rolePermissionService: RolePermissionService,
    private permissionService: PermissionService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.roleId = +params['roleId'] || 0;
      if (this.roleId) {
        this.loadRoleData();
        this.loadPermissions();
      }
    });
  }

  loadRoleData(): void {
    this.roleService.getRole(this.roleId).subscribe({
      next: (role) => {
        this.selectedRole = role;
      },
      error: (error) => {
        console.error('Error loading role:', error);
      }
    });
  }

  loadPermissions(): void {
    this.loading = true;
    
    // Cargar todos los permisos disponibles
    this.permissionService.getAllPermissions().subscribe({
      next: (permissions) => {
        this.permissions = permissions.map(p => ({ ...p, selected: false }));
        
        // Cargar permisos ya asignados al rol
        this.rolePermissionService.getRolePermissionsByRole(this.roleId).subscribe({
          next: (rolePermissions) => {
            // Marcar los permisos que ya están asignados
            rolePermissions.forEach(rp => {
              const permission = this.permissions.find(p => p.id === rp.permission_id);
              if (permission) {
                permission.selected = true;
              }
            });
            this.loading = false;
          },
          error: (error) => {
            console.error('Error loading role permissions:', error);
            this.loading = false;
          }
        });
      },
      error: (error) => {
        console.error('Error loading permissions:', error);
        this.loading = false;
      }
    });
  }

  savePermissions(): void {
    if (!this.roleId) {
      alert('No role selected');
      return;
    }

    this.loading = true;
    
    // Obtener permisos actualmente asignados
    this.rolePermissionService.getRolePermissionsByRole(this.roleId).subscribe({
      next: (currentRolePermissions) => {
        const currentPermissionIds = currentRolePermissions.map(rp => rp.permission_id);
        const selectedPermissionIds = this.permissions.filter(p => p.selected).map(p => p.id!);
        
        // Permisos a agregar (seleccionados pero no asignados)
        const toAdd = selectedPermissionIds.filter(id => !currentPermissionIds.includes(id));
        
        // Permisos a quitar (asignados pero no seleccionados)
        const toRemove = currentPermissionIds.filter(id => !selectedPermissionIds.includes(id));
        
        // Ejecutar todas las operaciones
        const operations: any[] = [];
        
        // Agregar nuevos permisos
        toAdd.forEach(permissionId => {
          operations.push(this.rolePermissionService.createRolePermission(this.roleId, permissionId));
        });
        
        // Quitar permisos no seleccionados
        toRemove.forEach(permissionId => {
          operations.push(this.rolePermissionService.deleteRolePermission(this.roleId, permissionId));
        });
        
        if (operations.length === 0) {
          this.loading = false;
          alert('No changes to save');
          return;
        }
        
        // Ejecutar todas las operaciones
        let completed = 0;
        let hasError = false;
        
        operations.forEach(operation => {
          operation.subscribe({
            next: () => {
              completed++;
              if (completed === operations.length && !hasError) {
                this.loading = false;
                alert('Permissions updated successfully');
              }
            },
            error: (error: any) => {
              console.error('Error updating permission:', error);
              if (!hasError) {
                hasError = true;
                this.loading = false;
                alert('Error updating permissions. Please try again.');
              }
            }
          });
        });
      },
      error: (error) => {
        console.error('Error loading current permissions:', error);
        this.loading = false;
        alert('Error loading current permissions');
      }
    });
  }

  onPermissionChange(permission: PermissionWithSelected): void {
    permission.selected = !permission.selected;
  }
}
