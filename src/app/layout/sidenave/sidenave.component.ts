import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenave',
  templateUrl: './sidenave.component.html',
  styleUrls: ['./sidenave.component.css']
})
export class SidenaveComponent implements OnInit {

  SidBarOpen=true;
  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar(){
    this.SidBarOpen=!this.SidBarOpen;
  }

}
