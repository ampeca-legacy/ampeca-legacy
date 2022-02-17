import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  auth=false;
  placeholder:string =""
  src:string =""
  searchdata:any={}
  options:any={}
  nextoptions:any={}
  constructor() { }

  ngOnInit(): void {
  }
  onChange(event:any,id:string){
    this.placeholder=event.target.value
    
    this.searchdata[id]=this.placeholder
    console.log(this.searchdata[id]);
    
    }
  search(){
    console.log(this.searchdata.search);
    var that=this
    this.options = {
      
        method: 'GET',
        url: 'https://soundcloud4.p.rapidapi.com/search',
        params: {query: this.searchdata.search, type: 'all'},
        headers: {
          'x-rapidapi-host': 'soundcloud4.p.rapidapi.com',
          'x-rapidapi-key': 'c79f02db9bmshcd00effe8e3977cp1fe0cdjsn6981b3130ac2'
        }
      };
      
      axios.request(this.options).then(function (response) {
        console.log(response.data);
        
        // that.nextoptions={
        //   method: 'GET',
        //   url: 'https://soundcloud4.p.rapidapi.com/song/info',
        //   params: {track_url: response.data[0].url},
        //   headers: {
        //     'x-rapidapi-host': 'soundcloud4.p.rapidapi.com',
        //     'x-rapidapi-key': 'c79f02db9bmshcd00effe8e3977cp1fe0cdjsn6981b3130ac2'
        //   }
        // };
        
        // axios.request(that.nextoptions).then(function (response) {
        //   console.log(response.data.embed.html,'this usrl' );
        //   that.src=response.data.embed.html
        //   that.src=that.src.slice(75,that.src.length-11)
        //   localStorage.setItem('scr',that.src)
        //   console.log(that.src);
          
        // }).catch(function (error) {
        //   console.error(error);
        // });
      }).catch(function (error) {
        console.error(error);
      });

}}
