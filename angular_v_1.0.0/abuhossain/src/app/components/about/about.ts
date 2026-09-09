import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Data } from '../../services/data';
import { CVData } from '../../model/cv';

@Component({
  imports: [
    CommonModule,
  ],
  selector: 'app-about',
  styleUrl: './about.css',
  templateUrl: './about.html',
})
export class AboutComponent implements OnInit{
  private dataService = inject(Data);
  private cdr = inject(ChangeDetectorRef);
  cvData?: CVData;

  ngOnInit(): void {
    this.dataService.getCVData().subscribe({
      next: (data) => {
        this.cvData = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching CV data:', err)
    });
  }

  printCV(): void {
    window.print();
  }
}
