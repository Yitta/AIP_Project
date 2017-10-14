import { Route } from '@angular/router';
import { SignupFormComponent } from './signup-form.component';


export const SignupFormRoute: Route[] = [
    {
        path: 'sign-up',
        component: SignupFormComponent
    }
];