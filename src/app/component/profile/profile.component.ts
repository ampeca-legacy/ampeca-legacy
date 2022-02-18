import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
auth=false
notfollowed = true;
//  buttonText:string= this.notfollowed? "follow " : "unfollow";
  constructor() { }

  ngOnInit(): void {
  }
  input(event:any){

  }
  followF() {
    this.notfollowed = !this.notfollowed;
    console.log('foo');
    
  }
  edit(){
    this.auth=!this.auth;
  }
  onClick(event:any) {
    event.preventDefault();
  }

}
