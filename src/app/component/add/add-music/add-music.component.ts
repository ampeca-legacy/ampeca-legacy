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
  url:string='http://localhost:3000/api/music/post'
   music:any={}
   placeholder : string = "" ;
   persondata : any = {}
   url_music:any=''
   x:any=""
   parsed:any={}

  ngOnInit(): void {
  }
  onKey(event:any,id:string){
    this.placeholder = event.target.value
    console.log(this.placeholder, event.target.name);
    this.persondata[id] = this.placeholder
    console.log(this.persondata[id]);
  }
  onchange(event:any){
    this.music = event.target.files[0];
    console.log(this.music);
  }
 
    upload(e:any){
     e.preventDefault()
      const formData = new FormData();
      formData.append("file", this.music);
      formData.append("upload_preset", "nt1uphup");

      axios.post("http://api.cloudinary.com/v1_1/magico/video/upload", formData)
        .then((result) => {
          console.log(result.data.url);
          this.persondata['url_music'] = result.data.url;
          this.x=localStorage.getItem('user')
          this.parsed=JSON.parse(this.x)
          this.persondata['id_user']=this.parsed.id_user
        }).then(()=>{
          axios.get(`http://localhost:3000/api/album/getalbum/${this.persondata['id_user']}`)
          .then((res)=>{
            this.persondata['id_album']=res.data[0].id_album
          }).then(()=>{
             axios.post(this.url,this.persondata)
           .then((res)=>{
             console.log(res)
           }).catch((err)=>{
             console.log(err)
           })
          }).catch((err)=>{
            console.log(err)
          })
        }).catch((err)=>{
          console.log(err)
        })
    }
  
}
