import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'music-app';
  src:string ="";
  showLogin = false;
  showPlaylist = false;
  showHome = false;
  showProfil = false;
  showAlbum = false;
  showAddAlbum = false;
  showAddMusic = false;
  
  switchToLogin() {
    this.showLogin = !this.showLogin;
  };
  switchToPlayList() {
    this.showPlaylist = !this.showPlaylist;
  };
  switchToHome() {
    this.showHome = !this.showHome;
  };
  switchToProfil() {
    this.showProfil = !this.showProfil;
  };
  
  switchToAlbum() {
    this.showAddAlbum = !this.showAddAlbum;
  };
  switchToMusic() {
    this.showAddMusic = !this.showAddMusic;
  };


}


