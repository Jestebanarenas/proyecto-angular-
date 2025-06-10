import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeguridadComponent } from './seguridad.component';
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
import { SessionComponent } from '../sessions/sessions.component';

const routes: Routes = [
  {
    path: '',
    component: SeguridadComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: UsersComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'permissions', component: PermissionComponent },
      { path: 'permissions/create', component: PermissionCreateComponent },
      { path: 'role-permissions', component: RolePermissionComponent },
      { path: 'address/:id', component: AddressComponent },
      { path: 'passwords/:id', component: PasswordsComponent },
      { path: 'profile/:userId', component: ProfileComponent },
      { path: 'user-role/:id', component: UserRoleComponent },
      { path: 'digital-signature/:id', component: DigitalSignatureComponent },
      { path: 'devices/:id', component: DeviceComponent },
      { path: 'sessions/:id', component: SessionComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule {}