import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AnswerComponent } from '../../pages/answer/answer.component';
import { SecurityQuestionComponent } from '../../pages/securityquestion/securityquestion.component';
import { AuthGuard } from '../../guards/auth.guard';
import { AdminGuard } from '../../guards/admin.guard';

export const AdminLayoutRoutes: Routes = [
    { 
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [AuthGuard] // Solo usuarios autenticados
    },
    { 
        path: 'user-profile', 
        component: UserProfileComponent,
        canActivate: [AuthGuard] // Solo usuarios autenticados
    },
    { 
        path: 'tables', 
        component: TablesComponent,
        canActivate: [AuthGuard] // Solo usuarios autenticados
    },
    { 
        path: 'icons', 
        component: IconsComponent,
        canActivate: [AuthGuard] // Solo usuarios autenticados
    },
    { 
        path: 'maps', 
        component: MapsComponent,
        canActivate: [AuthGuard] // Solo usuarios autenticados
    },
    {
        path: 'theaters',
        loadChildren: () => import('src/app/pages/theaters/theaters.module').then(m => m.TheatersModule),
        canActivate: [AuthGuard] // Solo usuarios autenticados
    },
    { 
        path: 'answers/:id', 
        component: AnswerComponent,
        canActivate: [AuthGuard, AdminGuard] // SOLO ADMINISTRADORES - CAMBIO AQUÍ
    },
    { 
        path: 'security-questions', 
        component: SecurityQuestionComponent,
        canActivate: [AuthGuard, AdminGuard] // SOLO ADMINISTRADORES - CAMBIO AQUÍ
    },
    { 
        path: 'seguridad', 
        loadChildren: () => import('../../pages/seguridad/seguridad.module').then(m => m.SeguridadModule),
        canActivate: [AuthGuard, AdminGuard] // Solo usuarios autenticados Y administradores
    }
];
