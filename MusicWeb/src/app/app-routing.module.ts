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
import { AdminComponent } from './admin/admin.component';
import { SongDeleteComponent } from './song-delete/song-delete.component';
import { UserModifyComponent } from './user-modify/user-modify.component';
import { ModifySongStatusComponent } from './modify-song-status/modify-song-status.component';
import { PlaylistCreateComponent } from './playlist-create/playlist-create.component';
import { PlaylistViewComponent } from './playlist-view/playlist-view.component';
import { PlaylistEditComponent } from './playlist-edit/playlist-edit.component';
import { PlaylistViewAdminComponent } from './playlist-view-admin/playlist-view-admin.component';
import { PlaylistDeleteComponent } from './playlist-delete/playlist-delete.component';
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
  { path: 'review_add', component: ReviewAddComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'song_delete', component: SongDeleteComponent },
  { path: 'user_modify', component: UserModifyComponent },
  { path: 'modify_song_status', component: ModifySongStatusComponent },
  { path: 'playlist_create', component: PlaylistCreateComponent },
  { path: 'playlist_view', component: PlaylistViewComponent },
  { path: 'playlist_edit', component: PlaylistEditComponent },
  { path: 'playlist_view_admin', component: PlaylistViewAdminComponent },
  { path: 'playlist_delete', component: PlaylistDeleteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
