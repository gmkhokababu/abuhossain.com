import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Data } from '../../services/data';
import { Project } from '../../model/project';

@Component({
  imports: [CommonModule],
  selector: 'app-projects',
  styleUrl: './projects.css',
  templateUrl: './projects.html',
})
export class ProjectsComponent implements OnInit {
  private dataService = inject(Data);
  private cdr = inject(ChangeDetectorRef);
  projects: Project[] = []; 

  ngOnInit(): void {
    this.dataService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching projects:', err)
    });
  }
}
