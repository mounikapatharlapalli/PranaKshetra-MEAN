import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';          // 🆕 Required for *ngFor
import { RouterModule } from '@angular/router';          // 🆕 Required for routerLink
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainers',
  standalone: true,                                      // 🆕 Standalone mode
  imports: [CommonModule, RouterModule],                 // 🆕 Explicit imports
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.scss']
})
export class TrainersComponent implements OnInit {

  trainers: any[] = [];

  constructor(private trainerService: TrainerService) {}

  ngOnInit(): void {
    this.loadTrainers();
  }

  loadTrainers(): void {
    this.trainerService.getAllTrainers().subscribe({
      next: (res) => {
        this.trainers = res;
      },
      error: (err) => {
        console.error('Failed to load trainers', err);
      }
    });
  }

  deleteTrainer(id: string): void {
    if (confirm('Are you sure you want to delete this trainer?')) {
      this.trainerService.deleteTrainer(id).subscribe(() => {
        this.loadTrainers();
      });
    }
  }
}
