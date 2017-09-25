import { AdminPageRoute } from './admin-page/admin-page.routes';
import { Routes } from '@angular/router';
import { ItemDetailRoutes } from './item-detail/item-detail.routes';
import { HomePageRoutes } from './home-page/home-page.routes';
import { AddFormsRoutes } from './add-form/add-form.routes';
import { SignupFormRoute } from './signup-form/signup-form.routes';
import { LoginFormRoute } from './login-form/login-form.routes'

export const routes: Routes = [
    ...HomePageRoutes,
    ...ItemDetailRoutes,
    ...AddFormsRoutes,
    ...SignupFormRoute,
    ...LoginFormRoute,
    ...AdminPageRoute,
    {
        path: '**',
        redirectTo: '/home-page',
        pathMatch: 'full'
    },
    
];