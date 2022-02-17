import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './component/main bars/nav/nav.component';
import { ProfileComponent } from './component/profile/profile.component';
import { PlaylistComponent } from './component/playlist/playlist.component';
import { LoginComponent } from './component/authentification/login/login.component';
import { SignupComponent } from './component/authentification/signup/signup.component';
import { HomeComponent } from './component/home/home.component';
import { PlayComponent } from './component/main bars/play/play.component';
import { CardComponent } from './component/cards/card.component';
import { SidenavbarComponent } from './component/main bars/sidenavbar/sidenavbar.component';
import { CategoriesHomeComponent } from './component/categories-home/categories-home.component';
import {CategoryComponent} from "./component/category/category.component";
import { AlbumComponent } from './component/album/album.component';
import { AddMusicComponent } from './component/add/add-music/add-music.component';
import { AddAlbumComponent } from './component/add/add-album/add-album.component';
import {HttpClientModule} from '@angular/common/http'


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProfileComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    PlaylistComponent,
    CategoriesHomeComponent,
    CategoryComponent,
    CardComponent,
    PlayComponent,
    AlbumComponent,
    AddMusicComponent,
    AddAlbumComponent,
    SidenavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
