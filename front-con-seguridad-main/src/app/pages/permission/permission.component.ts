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
  editingPermission: Permission | null = null;

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
    alert(`Permission Details:\nID: ${permission.id}\nURL: ${permission.url}\nMethod: ${permission.method}\nEntity: ${permission.entity}`);
  }

  updatePermission(permission: Permission) {
    this.editingPermission = { ...permission };
  }

  deletePermission(permission: Permission) {
    if (confirm('Are you sure you want to delete this permission?')) {
      this.permissionService.deletePermission(permission.id!).subscribe({
        next: () => {
          this.loadPermissions();
        },
        error: (error) => {
          console.error('Error deleting permission:', error);
          alert('Error deleting permission. Please try again.');
        }
      });
    }
  }

  addPermission() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  saveUpdate() {
    if (!this.editingPermission) return;

    if (!this.editingPermission.url?.trim() || !this.editingPermission.method?.trim()) {
      alert('Please fill all required fields');
      return;
    }

    this.permissionService.updatePermission(this.editingPermission.id!, this.editingPermission).subscribe({
      next: () => {
        this.loadPermissions();
        this.editingPermission = null;
      },
      error: (error) => {
        console.error('Error updating permission:', error);
        alert('Error updating permission. Please try again.');
      }
    });
  }

  cancelEdit() {
    this.editingPermission = null;
  }
}
