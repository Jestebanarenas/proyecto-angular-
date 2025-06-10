import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PermissionService, Permission } from '../../services/permission.service';

@Component({
  selector: 'app-permission-create',
  templateUrl: './permission-create.component.html',
  styleUrls: ['./permission-create.component.scss']
})
export class PermissionCreateComponent implements OnInit {
  permission: Permission = {
    url: '',
    method: '',
    entity: ''  // Agregar este campo
  };

  constructor(
    private permissionService: PermissionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  savePermission(): void {
    if (!this.permission.url || !this.permission.method || !this.permission.entity) {
      alert('Please fill all required fields');
      return;
    }

    this.permissionService.createPermission(this.permission).subscribe({
      next: (response) => {
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: (error) => {
        console.error('Error creating permission:', error);
        alert('Error creating permission. Please try again.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
