import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role.model';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles: Role[] = [];
  selectedRole: Role | null = null;
  isEditing: boolean = false;

  constructor(private roleService: RoleService) {}

  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
    this.roleService.getRoles().subscribe(roles => this.roles = roles);
  }

  openAddRole() {
    this.selectedRole = { id: null, name: '', description: '' };
    this.isEditing = false;
  }

  openEditRole(role: Role) {
    this.selectedRole = { ...role };
    this.isEditing = true;
  }

  saveRole() {
    if (this.selectedRole) {
      if (this.isEditing) {
        this.roleService.updateRole(this.selectedRole.id!, this.selectedRole).subscribe(() => {
          this.getRoles();
          this.selectedRole = null;
        }, error => {
          console.error('Error updating role:', error);
        });
      } else {
        this.roleService.createRole(this.selectedRole).subscribe(() => {
          this.getRoles();
          this.selectedRole = null;
        }, error => {
          console.error('Error creating role:', error);
        });
      }
    }
  }

  deleteRole(role: Role) {
    if (confirm('Are you sure you want to delete this role?')) {
      this.roleService.deleteRole(role.id!).subscribe(() => {
        this.getRoles();
      }, error => {
        console.error('Error deleting role:', error);
      });
    }
  }
}
