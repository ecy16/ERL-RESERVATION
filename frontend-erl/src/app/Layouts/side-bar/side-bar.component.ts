import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgFor, NgIf } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";



@Component({
  selector: "app-side-bar",
  standalone: true,
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.css"],
  // styles: ["width:200px"],
  imports: [CommonModule, NgFor, NgIf,MatIconModule],
})
export class SideBarComponent {
  showMasterMenu = false;
  showbookingMenu=false;
  showSidebar = true;


  constructor(private router: Router) {}
  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  toogleMasterMenu() {
    console.log('menu-master')

    this.showMasterMenu = !this.showMasterMenu;
  }

  navigateTo(page: string) {
    this.router.navigate([page]);
  }
  toogleBookingMenu() {
    console.log('menu-booking')
    this.showbookingMenu = !this.showbookingMenu;
  }

}
