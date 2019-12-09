import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TrendingComponent } from './trending/trending.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginSuccessComponent } from './login-success/login-success.component';
import { SongAddComponent } from './song-add/song-add.component';
import { TokenInterceptorService } from './token-interceptor.service';
import { SongUpdateComponent } from './song-update/song-update.component';
import { ReviewAddComponent } from './review-add/review-add.component';
import { RatingModule } from 'ng-starrating';
import { AdminComponent } from './admin/admin.component';
import { SongDeleteComponent } from './song-delete/song-delete.component';
import { UserModifyComponent } from './user-modify/user-modify.component';
import { ModifySongStatusComponent } from './modify-song-status/modify-song-status.component';
import { PlaylistCreateComponent } from './playlist-create/playlist-create.component';
import { PlaylistViewComponent } from './playlist-view/playlist-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    LoginComponent,
    SignupComponent,
    TrendingComponent,
    LoginSuccessComponent,
    SongAddComponent,
    SongUpdateComponent,
    ReviewAddComponent,
    AdminComponent,
    SongDeleteComponent,
    UserModifyComponent,
    ModifySongStatusComponent,
    PlaylistCreateComponent,
    PlaylistViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RatingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
