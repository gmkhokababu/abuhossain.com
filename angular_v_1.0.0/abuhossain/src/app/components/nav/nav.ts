import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  selector: 'app-nav',
  styleUrl: './nav.css',
  templateUrl: './nav.html',
})
export class NavComponent {
  isMenuCollapsed = true;

  toggleMenu(): void {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  closeMenu(): void {
    this.isMenuCollapsed = true;
  }
}
