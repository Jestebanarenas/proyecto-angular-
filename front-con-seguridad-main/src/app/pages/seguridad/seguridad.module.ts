import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeguridadComponent } from './seguridad.component';
import { SeguridadRoutingModule } from './seguridad-routing.module';
import { RolesComponent } from '../roles/roles.component';
import { AddressComponent } from '../address/address.component';
import { PasswordsComponent } from '../passwords/passwords.component';

@NgModule({
  declarations: [
    SeguridadComponent,
    RolesComponent,
    AddressComponent,
    PasswordsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SeguridadRoutingModule
  ]
})
export class SeguridadModule { }