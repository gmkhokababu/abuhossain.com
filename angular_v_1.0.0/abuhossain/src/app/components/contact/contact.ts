import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Data } from '../../services/data';
import { ContactInfo } from '../../model/contact';
import { LoadingComponent } from '../loading/loading';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    LoadingComponent,
  ],
  selector: 'app-contact',
  styleUrl: './contact.css',
  templateUrl: './contact.html',
})
export class ContactComponent implements OnInit {
  isLoading = true;
  private dataService = inject(Data);
  private cdr = inject(ChangeDetectorRef);

  contactInfo?: ContactInfo;
  formData = { name: '', email: '', message: '' };

  ngOnInit(): void {
    this.dataService.getContactInfo().subscribe({
      next: (data) => {
        this.contactInfo = data;
        this.cdr.detectChanges();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching contact info:', err);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    alert(`Thank you ${this.formData.name}, your message has been recorded!`);
    this.formData = { name: '', email: '', message: '' };
  }
}
