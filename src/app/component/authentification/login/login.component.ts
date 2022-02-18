import { Component, OnInit,Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private router: Router) { }
  url='http://localhost:3000/api/user/login'
  placeholder:string =""
  persondata:any={}
  error=""
  ngOnInit(): void {
  }
  userInfo(event:any,id:string){
    this.placeholder=event.target.value
    console.log(this.placeholder,event.target.name);
    this.persondata[id]=this.placeholder
    console.log(this.persondata[id]);
  }
  submit(event:any){
    event.preventDefault();
      console.log(this.persondata);
      axios.post(this.url,this.persondata).then((res)=>{
        console.log(res)
        if(typeof res.data === 'object'){
          localStorage.setItem('user',JSON.stringify(res.data))
          this.router.navigate(["home"])
         }else{
          this.router.navigate(["login"])
          this.error=res.data
         }
      }).catch((err)=>{
        console.log(err)
      })
  }
}
