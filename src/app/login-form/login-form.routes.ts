import { Route } from '@angular/router';
import { LoginFormComponent } from './login-form.component';


export const LoginFormRoute: Route[] = [
    {
        path: 'log-in',
        component: LoginFormComponent
    }
];