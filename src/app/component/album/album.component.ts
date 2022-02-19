import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  id_album: any
  album:any
  url:any=''
  constructor() { }

  ngOnInit(): void {
    this.id_album = JSON.parse(localStorage.getItem('id_album')!)
axios.get(`http://localhost:3000/api/album/getmusic/${this.id_album}`)
.then(res=>{this.album=res.data
console.log(this.album);
}
)
  }
  clickon(str:string){
this.url=str
console.log(this.url);

  }

}
