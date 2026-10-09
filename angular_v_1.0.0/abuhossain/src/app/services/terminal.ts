import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {
  private http = inject(HttpClient);

  getTerminalData(): Observable<any> {
    return this.http.get('/terminal-data.json');
  }
}