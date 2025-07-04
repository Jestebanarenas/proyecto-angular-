import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeguridadComponent } from './seguridad.component';
import { UsersComponent } from '../users/users.component';
import { RolesComponent } from '../roles/roles.component';
import { AddressComponent } from '../address/address.component';
import { PasswordsComponent } from '../passwords/passwords.component';

const routes: Routes = [
  {
    path: '',
    component: SeguridadComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: UsersComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'address/:id', component: AddressComponent },  // <-- Cambia aquí
      { path: 'passwords/:id', component: PasswordsComponent },
      // { path: 'permissions', component: PermissionsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule {}