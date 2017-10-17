import { PasswordResetRoute } from './password-reset/password-reset.routes';
import { SearchResultRoutes } from './search-result/search-result.routes';
import { AdminPageRoute } from './admin-page/admin-page.routes';
import { Routes } from '@angular/router';
import { ItemDetailRoutes } from './item-detail/item-detail.routes';
import { HomePageRoutes } from './home-page/home-page.routes';
import { AddFormsRoutes } from './add-form/add-form.routes';
import { SignupFormRoute } from './signup-form/signup-form.routes';
import { LoginFormRoute } from './login-form/login-form.routes';
import { EmailFormRoute } from './email-form/email-form.routes'

export const routes: Routes = [
    ...HomePageRoutes,
    ...ItemDetailRoutes,
    ...AddFormsRoutes,
    ...SignupFormRoute,
    ...LoginFormRoute,
    ...AdminPageRoute,
    ...SearchResultRoutes,
    ...PasswordResetRoute,
    ...EmailFormRoute,
    {
        path: '**',
        redirectTo: '/home-page',
        pathMatch: 'full'
    },
    
];