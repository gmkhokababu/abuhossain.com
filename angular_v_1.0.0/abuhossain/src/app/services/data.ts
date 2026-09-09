import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Education } from '../model/education';
import { CVData } from '../model/cv';
import { Project } from '../model/project';
import { ContactInfo } from '../model/contact';
@Injectable({
  providedIn: 'root'
})
export class Data {
  private http = inject(HttpClient);

  getEducation(): Observable<Education[]> {
    return this.http.get<Education[]>('/data/education.json');
  }

  // use local file or GitHub Raw URL 
  private jsonUrl = '/data/cv.json';
  private projectsUrl = '/data/projects.json';
  private contactUrl = '/data/contact.json';


  getCVData(): Observable<CVData> {
    return this.http.get<CVData>(this.jsonUrl);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl);
  }

  getContactInfo(): Observable<ContactInfo> {
    return this.http.get<ContactInfo>(this.contactUrl);
  } 
}