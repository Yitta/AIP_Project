import { CommentListComponent } from './components/comment-list/comment-list.component';

//import required modules
import { AuthGuard } from './auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

//import all the components
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddFormsComponent } from './add-form/add-form.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component'
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AuthenticationStateComponent } from './components/authentication-state/authentication-state.component';
import { MapComponent } from './components/map/map.component';
import { EditModalComponent, NgbdModalContent } from './components/edit-modal/edit-modal.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

//import all the services
import { DiscountsService } from './services/discounts.service';
import { AuthenticationService } from './services/authentication.service';
import { AdminService } from './services/admin.service';


@NgModule({
  declarations: [
    AppComponent,
    ItemDetailComponent,
    HomePageComponent,
    AddFormsComponent,
    CommentFormComponent,
    AuthenticationStateComponent,
    MapComponent,
    SignupFormComponent,
    LoginFormComponent,
    AdminPageComponent,
    EditModalComponent,
    NgbdModalContent,
    SearchResultComponent,
    CommentListComponent
,
    PasswordResetComponent
],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'  //Google Map API KEY
    }),
    AgmSnazzyInfoWindowModule
  ],
  providers: [DiscountsService, AuthenticationService, AdminService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [NgbdModalContent]
})
export class AppModule { }
