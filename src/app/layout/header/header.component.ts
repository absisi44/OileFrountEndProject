import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() teggleSidebarForMe:EventEmitter<any>= new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar(){
    this.teggleSidebarForMe.emit();
  }

}
function output() {
  throw new Error('Function not implemented.');
}
