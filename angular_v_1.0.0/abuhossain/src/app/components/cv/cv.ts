import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Data } from '../../services/data';
import { CVData } from '../../model/cv';

@Component({
  imports: [
    CommonModule,
  ],
  selector: 'app-cv',
  styleUrl: './cv.css',
  templateUrl: './cv.html',
})
export class CvComponent implements OnInit {
  private dataService = inject(Data);
  cvData?: CVData;

  ngOnInit(): void {
    this.dataService.getCVData().subscribe({
      next: (data) => {
        this.cvData = data;
        // Print the CV after a short delay to ensure the data is rendered
        setTimeout(() => {
          window.print();
        }, 500);
      }
    });
  }
}