import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private apiUrl = 'http://localhost:5000/api/trainers';

  constructor(private http: HttpClient) {}

  getAllTrainers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getTrainerById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createTrainer(trainer: any): Observable<any> {
    return this.http.post(this.apiUrl, trainer);
  }

  updateTrainer(id: string, trainer: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, trainer);
  }

  deleteTrainer(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
