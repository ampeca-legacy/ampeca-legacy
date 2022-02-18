import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  placeholder:string =""
  master:any
  src:string =""
  searchdata:any={}
  options:any={}
  nextoptions:any={}
  mainarray:any=[]
  categories:any=[]
  constructor(private route: ActivatedRoute) { }
 @Input() id=this.route.snapshot.paramMap.get("id");

  ngOnInit(): void {
    // console.log(this.route.snapshot.paramMap.get("id"))
    axios.get('http://localhost:3000/api/album/getalbum').
    then(res=>this.categories=res.data)
    axios.get("http://localhost:3000/api/album/getall")
    .then(res=>{
      console.log(res.data);
      var array=[]
      for (var i=0;i<this.categories.length;i++){
        for (var j=0;j<res.data.length;j++){
          if(this.categories[i]===res.data[j].category_album){
            array.push(res.data[j])
          }
        }
        this.mainarray.push(array)
        array=[]
      }
      console.log(this.mainarray);
      
      
    })

    
  }
  onChange(event:any,id:string){
    this.placeholder=event.target.value
    this.searchdata[id]=this.placeholder
    console.log(this.searchdata[id]);

    }
  search(event:any){
    console.log(this.searchdata.search);
event.preventDefault()
}
}
