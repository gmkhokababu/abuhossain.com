import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Data } from '../../services/data';
import { ContactInfo } from '../../model/contact';

@Component({
  imports: [
    CommonModule,
    FormsModule,
  ],
  selector: 'app-contact',
  styleUrl: './contact.css',
  templateUrl: './contact.html',
})
export class ContactComponent implements OnInit {
  private dataService = inject(Data);
  private cdr = inject(ChangeDetectorRef);

  contactInfo?: ContactInfo;
  formData = { name: '', email: '', message: '' };

  ngOnInit(): void {
    this.dataService.getContactInfo().subscribe({
      next: (data) => {
        this.contactInfo = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching contact info:', err)
    });
  }

  onSubmit(): void {
    alert(`Thank you ${this.formData.name}, your message has been recorded!`);
    this.formData = { name: '', email: '', message: '' };
  }
}
