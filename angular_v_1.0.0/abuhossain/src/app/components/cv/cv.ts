import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Data } from '../../services/data';
import { CVData } from '../../model/cv';

@Component({
  imports: [
    CommonModule,
  ],
  standalone: true,
  selector: 'app-cv',
  styleUrl: './cv.css',
  templateUrl: './cv.html',
})
export class CvComponent implements OnInit {
  private dataService = inject(Data);
  private cdr = inject(ChangeDetectorRef);
  cvData?: CVData;

  ngOnInit(): void {
    this.dataService.getCVData().subscribe({
      next: (data) => {
        this.cvData = data;
        this.cdr.detectChanges();
        setTimeout(() => {
          window.print();
        }, 500);
      },
      error: (err) => console.error('Error fetching CV data:', err)
    });
  }
}