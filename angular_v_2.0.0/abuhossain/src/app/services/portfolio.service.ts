import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PortfolioData } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private portfolioData: PortfolioData | null = null;

  constructor(private http: HttpClient) {}

  getPortfolioData(): Observable<PortfolioData> {
    if (this.portfolioData) {
      return of(this.portfolioData);
    }

    return this.http.get<PortfolioData>('assets/data/portfolio.json');
  }
}