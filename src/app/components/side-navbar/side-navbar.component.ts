import { Component } from '@angular/core';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent {
  public showFullNavbar:boolean=false;
  changeWidth(){
    this.showFullNavbar=!this.showFullNavbar;
  }
}
