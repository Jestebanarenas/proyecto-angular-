import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { DigitalSignatureComponent } from '../../pages/digitalsignature/digitalsignature.component';
import { SecurityQuestionComponent } from '../../pages/securityquestion/securityquestion.component';
import { AnswerComponent } from '../../pages/answer/answer.component';
import { DeviceComponent } from 'src/app/pages/device/device.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'tables', component: TablesComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    {
        path: 'theaters',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/theaters/theaters.module').then(m => m.TheatersModule)
            }
        ]
    },
    { path: 'seguridad', loadChildren: () => import('../../pages/seguridad/seguridad.module').then(m => m.SeguridadModule) },
    { path: 'digital-signature', component: DigitalSignatureComponent },
    { path: 'security-questions', component: SecurityQuestionComponent },
    { path: 'answers', component: AnswerComponent },
    {path: 'devices', component: DeviceComponent}

];
