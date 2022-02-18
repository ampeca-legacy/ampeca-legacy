import { Component, OnInit } from '@angular/core';
import axios from 'axios'
import 'form-data'
@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.css']
})
export class AddAlbumComponent implements OnInit {
  url = 'http://localhost:3000/api/album/addAlbum';
  placeholder : string = "" ;
  persondata : any = {}
  img : any = {}
  x:any=""
  parsed:any={}
  constructor() { }

  ngOnInit(): void {
   
  }
  onKey(event : any, id : string) {
    this.placeholder = event.target.value
    console.log(this.placeholder, event.target.name);
    this.persondata[id] = this.placeholder
    console.log(this.persondata[id]);
}
onchange(event : any) {
    this.img = event.target.files[0];
    console.log(this.img);
}
add(event : any) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", this.img);
    formData.append("upload_preset", "nt1uphup");
    axios.post("http://api.cloudinary.com/v1_1/magico/image/upload", formData).then((result) => {
        this.persondata['cover_album'] = result.data.url;
        this.x=localStorage.getItem('user')
        this.parsed=JSON.parse(this.x)
        this.persondata['id_user']=this.parsed.id_user
        console.log(this.persondata,'user id')
    }).then(() => {
        axios.post(this.url, this.persondata).then((res) => {
            console.log(res)
            
        }).catch((err) => {
            console.log(err)
        })
    }).catch((err) => {
        console.log(err)
    })
    


}

}
