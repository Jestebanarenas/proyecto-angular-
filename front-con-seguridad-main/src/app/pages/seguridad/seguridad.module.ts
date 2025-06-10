import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeguridadComponent } from './seguridad.component';
import { SeguridadRoutingModule } from './seguridad-routing.module';
import { RolesComponent } from '../roles/roles.component';
import { AddressComponent } from '../address/address.component';
import { PasswordsComponent } from '../passwords/passwords.component';
import { RouterModule } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';
import { SecurityQuestionService } from 'src/app/services/securityquestion.service';
import { UserAnswerService } from 'src/app/services/answer.service';
import { UserService } from 'src/app/services/user.service';


@NgModule({
  declarations: [
    SeguridadComponent,
    RolesComponent,
    AddressComponent,
    PasswordsComponent,
    RouterModule,
    SecurityService,
    SecurityQuestionService,
    UserAnswerService,
    UserService
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SeguridadRoutingModule
  ]
})
export class SeguridadModule { }