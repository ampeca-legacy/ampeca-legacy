import { Component, OnInit } from '@angular/core';
import axios from 'axios';

import 'form-data'

@Component({
  selector: 'app-add-music',
  templateUrl: './add-music.component.html',
  styleUrls: ['./add-music.component.css']
})
export class AddMusicComponent implements OnInit {

  constructor() { }
music:any={}
url_music:any=''
  ngOnInit(): void {
  }
  onchange(event:any){
    this.music = event.target.files[0];
    console.log(this.music);
  }
 
      upload(){
        const formData = new FormData();
      formData.append("file", this.music);
      formData.append("upload_preset", "nt1uphup");

      axios.post("http://api.cloudinary.com/v1_1/magico/video/upload", formData)
        .then((result) => {
          console.log(result.data.url);
          this.url_music = result.data.url;
        });
    }
  
}
