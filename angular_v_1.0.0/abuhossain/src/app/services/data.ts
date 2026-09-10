import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Education } from '../model/education';
import { CVData } from '../model/cv';
import { Project } from '../model/project';
import { ContactInfo } from '../model/contact';
import { catchError } from 'rxjs';
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

  // GitHub Raw URL
  private gitHubRawCVUrl = 'https://raw.githubusercontent.com/gmkhokababu/abuhossain.com/refs/heads/main/angular_v_1.0.0/abuhossain/public/data/cv.json';
  private gitHubRawprojectsUrl = 'https://raw.githubusercontent.com/gmkhokababu/my-portfolio-data/refs/heads/main/projects.json';
  private gitHubRawcontactUrl = 'https://raw.githubusercontent.com/gmkhokababu/my-portfolio-data/refs/heads/main/contact.json';


  getCVData(): Observable<CVData> {
    return this.http.get<CVData>(this.gitHubRawCVUrl).pipe(
      catchError((error) => {
        console.warn('Failed to fetch CV data from GitHub. Falling back to local JSON file.', error);
        return this.http.get<CVData>(this.jsonUrl);
      })
    );
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl).pipe(
      catchError((error) => {
        console.warn('Failed to fetch projects data from GitHub. Falling back to local JSON file.', error);
        return this.http.get<Project[]>(this.gitHubRawprojectsUrl);
      })
    );
  }

  getContactInfo(): Observable<ContactInfo> {
    return this.http.get<ContactInfo>(this.contactUrl).pipe(
      catchError((error) => {
        console.warn('Failed to fetch contact info from GitHub. Falling back to local JSON file.', error);
        return this.http.get<ContactInfo>(this.gitHubRawcontactUrl);
      })
    );
  }
}