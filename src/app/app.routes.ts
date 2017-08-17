import { Routes } from '@angular/router';
import { ItemDetailRoutes } from './item-detail/item-detail.routes';
import { HomePageRoutes } from './home-page/home-page.routes';
import { AddFormsRoutes } from './add-form/add-form.routes';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home-page',
        pathMatch: 'full'
    },
    ...HomePageRoutes,
    ...ItemDetailRoutes,
    ...AddFormsRoutes,
    
];