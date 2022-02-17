import { Component, OnInit,Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {
  constructor(private router: Router) { }
  url='http://localhost:3000/api/register'
  placeholder:string =""
  persondata:any={}
  error=""
 
  ngOnInit(): void {
  }

  onKey(event:any,id:string){
  this.placeholder=event.target.value
  console.log(this.placeholder,event.target.name);
  this.persondata[id]=this.placeholder
  console.log(this.persondata[id]);
  }
on(event:any){
 event.preventDefault();
   axios.post(this.url,this.persondata).then((res)=>{
     console.log(res)
     if(res.data ==="The user has been registerd with us!"){
      this.router.navigate(["login"])
     }else{
      this.router.navigate(["signup"])
      this.error=res.data
     }
   }).catch((err)=>{
     console.log(err)
   })

}
}
