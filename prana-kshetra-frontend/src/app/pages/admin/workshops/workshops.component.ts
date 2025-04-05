import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for *ngFor, pipes, etc.
import { Router } from '@angular/router'; // For navigation
import { WorkshopService } from 'src/app/services/workshop.service'; // Service to handle workshops

@Component({
  selector: 'app-workshops',
  standalone: true,
  imports: [CommonModule], // Add any other modules here if needed (e.g., FormsModule)
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.scss'],
})
export class WorkshopsComponent implements OnInit {
  workshops: any[] = []; // You can create a Workshop interface later

  constructor(
    private router: Router,
    private workshopService: WorkshopService
  ) {}

  ngOnInit(): void {
    this.loadWorkshops();
  }

  // Load all workshops from the backend API
  loadWorkshops(): void {
    this.workshopService.getWorkshops().subscribe({
      next: (data) => {
        this.workshops = data;
        console.log('Workshops loaded:', this.workshops);
      },
      error: (err) => {
        console.error('Error loading workshops:', err);
      },
    });
  }

  // Navigate to add workshop page
  addWorkshop(): void {
    console.log('Navigating to add workshop...');
    this.router.navigate(['/admin/workshops/add']);
  }

  // Navigate to edit workshop page
  editWorkshop(id: string): void {
    console.log('Navigating to edit workshop with ID:', id);
    this.router.navigate(['/admin/workshops/edit', id]);
  }

  // Delete a workshop by ID
  deleteWorkshop(id: string): void {
    if (confirm('Are you sure you want to delete this workshop?')) {
      this.workshopService.deleteWorkshop(id).subscribe({
        next: () => {
          alert('Workshop deleted successfully!');
          this.loadWorkshops(); // Refresh the list
        },
        error: (err) => {
          console.error('Failed to delete workshop:', err);
          alert('Failed to delete workshop.');
        },
      });
    }
  }
}
