import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';          // 🆕 Required for structural directives (*ngIf)
import { FormsModule } from '@angular/forms';            // 🆕 Required for ngModel and ngForm
import { RouterModule, ActivatedRoute, Router } from '@angular/router'; // 🆕 Required for routerLink
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-add-edit-trainer',
  standalone: true,                                      // 🆕 Standalone mode
  imports: [CommonModule, FormsModule, RouterModule],    // 🆕 Explicit imports
  templateUrl: './add-edit-trainer.component.html',
  styleUrls: ['./add-edit-trainer.component.scss']
})
export class AddEditTrainerComponent implements OnInit {

  trainerId: string | null = null;
  trainer: any = {
    name: '',
    expertise: '',
    description: '',
    experience: 0,
    image: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trainerService: TrainerService
  ) {}

  ngOnInit(): void {
    this.trainerId = this.route.snapshot.paramMap.get('id');
    if (this.trainerId) {
      this.trainerService.getTrainerById(this.trainerId).subscribe((res) => {
        this.trainer = res;
      });
    }
  }
  onSubmit(): void {
    if (this.trainerId) {
      // Update Trainer
      this.trainerService.updateTrainer(this.trainerId, this.trainer).subscribe({
        next: () => {
          alert('Trainer updated successfully');
          this.router.navigate(['/admin/trainers']);
        },
        error: (err) => {
          console.error('Error updating trainer:', err);
          alert('Failed to update trainer');
          console.log('Backend validation error:', err.error);
        }
      });
    } else {
      // Create Trainer
      console.log('Submitting trainer:', this.trainer); // <-- Debug payload
  
      this.trainerService.createTrainer(this.trainer).subscribe({
        next: () => {
          alert('Trainer added successfully');
          this.router.navigate(['/admin/trainers']);
        },
        error: (err) => {
          console.error('Error adding trainer:', err);
          alert('Failed to add trainer');
          console.log('Backend validation error:', err.error);
        }
      });
    }
  }
  

  cancel(): void {
    this.router.navigate(['/admin/trainers']);
  }
}

