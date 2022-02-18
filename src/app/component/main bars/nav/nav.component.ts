import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  auth=false;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
     console.log('huudcdsh',this.route.snapshot.paramMap.get("id"))
    
  }
  

}
