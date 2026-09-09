import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Data } from '../../services/data';
import { Education } from '../../model/education';


@Component({
  imports: [CommonModule],
  standalone: true,
  selector: 'app-education',
  styleUrl: './education.css',
  templateUrl: './education.html',
})
export class EducationComponent implements OnInit{
  private dataService = inject(Data);
  private cdr = inject(ChangeDetectorRef);
  educationList: Education[] = [];

  ngOnInit(): void {
    console.log('Fetching education data...');
    this.dataService.getEducation().subscribe({
      next: (data) => {
        console.log('Received data:', data);
        // alert('Data fetched successfully! Total items: ' + data.length);
        this.educationList = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching data:', err);
        alert('Failed to fetch data! Check browser console.');
      }
    });
  }
}
