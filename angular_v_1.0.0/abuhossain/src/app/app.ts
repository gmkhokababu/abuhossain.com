import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { EducationComponent } from "./components/education/education";
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav';
import { filter } from 'rxjs';

@Component({
  imports: [
    RouterOutlet, 
    CommonModule,
    NavComponent
  ],
  standalone: true,
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class AppComponent {
  protected readonly title = signal('abuhossain');
  private router = inject(Router);
  isCvPage = false;

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // '/cv' পেজে থাকলে নেভবার ও ফুটার হাইড হবে
        this.isCvPage = event.urlAfterRedirects.includes('/cv');
      });
  }
}
