import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRoleService } from '../../services/user-role.service';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {
  userId!: number;
  userRoles: any[] = [];
  allRoles: any[] = [];
  selectedRoleId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private userRoleService: UserRoleService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUserRoles();
    this.loadAllRoles();
  }

  loadUserRoles() {
    this.userRoleService.getRolesByUser(this.userId).subscribe(res => {
      this.userRoles = res;
    });
  }

  loadAllRoles() {
    this.roleService.getRoles().subscribe(res => {
      this.allRoles = res;
    });
  }

  addRole() {
    if (this.selectedRoleId) {
      this.userRoleService.addRoleToUser(this.userId, this.selectedRoleId).subscribe(() => {
        this.loadUserRoles();
        this.selectedRoleId = null;
      });
    }
  }

  removeRole(userRoleId: string) {
    this.userRoleService.removeRoleFromUser(userRoleId).subscribe(() => {
      this.loadUserRoles();
    });
  }

  getRoleName(roleId: number): string {
    const role = this.allRoles.find(r => r.id === roleId);
    return role ? role.name : roleId.toString();
  }
}
