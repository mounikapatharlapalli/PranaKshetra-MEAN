import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {
  
  private baseUrl = 'http://localhost:5000/api/workshops'; // Adjust this URL to match your backend endpoint

  constructor(private http: HttpClient) {}

  // Get all workshops
  getWorkshops(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Get a single workshop by ID
  getWorkshopById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // Create a new workshop
  createWorkshop(workshopData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, workshopData);
  }

  // Update a workshop
  updateWorkshop(id: string, workshopData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, workshopData);
  }

  // Delete a workshop
  deleteWorkshop(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
