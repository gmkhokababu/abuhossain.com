import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class HomeComponent {
  downloadCV(): void {
    window.open('/cv', '_blank');
  }
}