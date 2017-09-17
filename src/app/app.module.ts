import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';

import { ItemDetailComponent } from './item-detail/item-detail.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddFormsComponent } from './add-form/add-form.component';
import { NgbdDatepickerRange } from './components/datepicker-range/datepicker-range.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component'
import { DiscountsService } from './discounts.service';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemDetailComponent,
    HomePageComponent,
    AddFormsComponent,
    NgbdDatepickerRange,
    CommentFormComponent,
    SignupFormComponent,
    LoginFormComponent,
    AdminPageComponent
],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot() 
  ],
  providers: [DiscountsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
