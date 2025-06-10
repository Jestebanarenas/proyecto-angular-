import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SeguridadComponent } from './seguridad.component';
import { SeguridadRoutingModule } from './seguridad-routing.module';
import { UsersComponent } from '../users/users.component';
import { RolesComponent } from '../roles/roles.component';
import { AddressComponent } from '../address/address.component';
import { PasswordsComponent } from '../passwords/passwords.component';
import { ProfileComponent } from '../profile/profile.component';
import { PermissionComponent } from '../permission/permission.component';
import { PermissionCreateComponent } from '../permission-create/permission-create.component';
import { RolePermissionComponent } from '../role-permission/role-permission.component';
import { UserRoleComponent } from '../user-role/user-role.component';
import { DigitalSignatureComponent } from '../digitalsignature/digitalsignature.component';
import { DeviceComponent } from '../device/device.component';

@NgModule({
  declarations: [
    SeguridadComponent,
    UsersComponent,
    RolesComponent,
    AddressComponent,
    PasswordsComponent,
    ProfileComponent,
    PermissionComponent,
    PermissionCreateComponent,      
    RolePermissionComponent,
    UserRoleComponent,
    DigitalSignatureComponent,
    DeviceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SeguridadRoutingModule
  ]
})
export class SeguridadModule { }