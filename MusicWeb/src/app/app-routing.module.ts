import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { TrendingComponent } from './trending/trending.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LoginSuccessComponent } from './login-success/login-success.component';
import { SongAddComponent } from './song-add/song-add.component';
import { SongUpdateComponent } from './song-update/song-update.component';
import { ReviewAddComponent } from './review-add/review-add.component';
import { AuthGuard } from './auth.guard'


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'trending', component: TrendingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login_success', component: LoginSuccessComponent, canActivate: [AuthGuard] },
  { path: 'song_add', component: SongAddComponent },
  { path: 'song_update', component: SongUpdateComponent },
  { path: 'review_add', component: ReviewAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
