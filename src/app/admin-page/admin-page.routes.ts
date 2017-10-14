import { AdminPageComponent } from './admin-page.component';
import { Route } from '@angular/router';
import { AuthGuard } from '../auth.guard'

export const AdminPageRoute: Route[] = [
    {
        path: 'admin-page',
        component: AdminPageComponent,
        // canActivate: [AuthGuard]
    }
];
