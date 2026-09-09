import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EducationComponent } from "./components/education/education";
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav';

@Component({
  imports: [
    RouterOutlet, 
    CommonModule,
    NavComponent
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('abuhossain');
}
