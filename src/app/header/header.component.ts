import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuVisible = false;

  constructor() {
    window.addEventListener("click", event => {
      if(event.target && event.target.id != "avatarId"){
        if(this.menuVisible)
          this.toggleMenu();
      }
    });
   }

  ngOnInit() {
  }

  toggleMenu(){
    document.getElementById('menuId').style.display = this.menuVisible ? "none" : "block";
    this.menuVisible = !this.menuVisible;
  }
  

}
