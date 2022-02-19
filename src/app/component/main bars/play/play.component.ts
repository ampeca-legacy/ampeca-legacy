import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  loggedin:boolean = true;
  @Input() url:any
  constructor() { }

  ngOnInit(): void {
  }

}
