import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
@Input() origin:any
  constructor() { }

  ngOnInit(): void {
  }
  log() {
    console.log('foo')
  }
  onclick(n:number){
      localStorage.setItem('id_album',JSON.stringify(n))
  }
}
