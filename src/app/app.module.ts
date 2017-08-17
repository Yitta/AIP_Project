import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ItemDetailComponent } from './item-detail/item-detail.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddFormsComponent } from './add-form/add-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemDetailComponent,
    HomePageComponent,
    AddFormsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
