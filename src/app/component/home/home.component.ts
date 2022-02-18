import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }
 @Input() id=this.route.snapshot.paramMap.get("id");

  ngOnInit(): void {
    // console.log(this.route.snapshot.paramMap.get("id"))
    
  }

 
}
