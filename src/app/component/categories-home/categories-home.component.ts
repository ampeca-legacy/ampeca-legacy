import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories-home',
  templateUrl: './categories-home.component.html',
  styleUrls: ['./categories-home.component.css']
})
export class CategoriesHomeComponent implements OnInit {
@Input() master:any ;
question=[]
  constructor() {


  }

  ngOnInit(): void {
    
  }

}
