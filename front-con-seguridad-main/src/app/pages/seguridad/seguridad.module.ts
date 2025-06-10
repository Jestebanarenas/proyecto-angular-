import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeguridadComponent } from './seguridad.component';
import { SeguridadRoutingModule } from './seguridad-routing.module';
import { RolesComponent } from '../roles/roles.component';
import { AddressComponent } from '../address/address.component';
import { PasswordsComponent } from '../passwords/passwords.component';
import { ProfileComponent } from '../profile/profile.component'; // <-- Importa el componente Profile
import { PermissionComponent } from '../permission/permission.component';
import { PermissionCreateComponent } from '../permission-create/permission-create.component';
import { RolePermissionComponent } from '../role-permission/role-permission.component';

@NgModule({
  declarations: [
    SeguridadComponent,
    RolesComponent,
    AddressComponent,
    PasswordsComponent,
    ProfileComponent,
    PermissionComponent,
    PermissionCreateComponent,      
    RolePermissionComponent         
  ],
  imports: [
    CommonModule,
    FormsModule,
    SeguridadRoutingModule
  ]
})
export class SeguridadModule { }