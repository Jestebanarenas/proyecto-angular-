import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeguridadComponent } from './seguridad.component';
import { SeguridadRoutingModule } from './seguridad-routing.module';
import { RolesComponent } from '../roles/roles.component';
import { AddressComponent } from '../address/address.component';
import { PasswordsComponent } from '../passwords/passwords.component';
import { ProfileComponent } from '../profile/profile.component';
import { PermissionComponent } from '../permission/permission.component';
import { PermissionCreateComponent } from '../permission-create/permission-create.component';
import { RolePermissionComponent } from '../role-permission/role-permission.component';
import { DigitalSignatureComponent } from '../digitalsignature/digitalsignature.component';
import { DeviceComponent } from '../device/device.component';
// Agregar estos componentes que están usando ngModel

@NgModule({
  declarations: [
    SeguridadComponent,
    RolesComponent,
    AddressComponent,
    PasswordsComponent,
    ProfileComponent,
    PermissionComponent,
    PermissionCreateComponent,      
    RolePermissionComponent,       
    DigitalSignatureComponent,
    DeviceComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, // Esto es crucial para ngModel
    SeguridadRoutingModule
  ]
})
export class SeguridadModule { }