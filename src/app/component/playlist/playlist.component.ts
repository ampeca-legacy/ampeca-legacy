import { Component, OnInit } from '@angular/core';
import { Play } from 'src/app/playlist';
import { LISTS } from './mock-list';
@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  item:Play={
   id:1,
   name:"playlist1",
   listmusic:[{
    artistName:"Riles",
    musicName:"better days"  
  }]

  };
  myList=LISTS

  constructor() { }

  ngOnInit(): void {
  }

}
