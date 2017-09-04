import { Route } from '@angular/router';
import { ItemDetailComponent } from './item-detail.component';


export const ItemDetailRoutes: Route[] = [
    {
        path: 'home-page/:id',
        component: ItemDetailComponent
    }
];