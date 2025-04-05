import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ Needed for ngFor, ngIf
import { WorkshopService } from '../../../services/workshop.service';
import { TrainerService } from '../../../services/trainer.service';

@Component({
  standalone: true,
  selector: 'app-add-edit-workshop',
  templateUrl: './add-edit-workshop.component.html',
  styleUrls: ['./add-edit-workshop.component.scss'],
  imports: [
    CommonModule,          // ✅ Required for *ngFor, *ngIf
    ReactiveFormsModule,   // ✅ Required for [formGroup] etc.
    RouterModule
  ],
})
export class AddEditWorkshopComponent implements OnInit {

  workshopForm!: FormGroup;
  trainers: any[] = [];
  isEditMode = false;
  workshopId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private workshopService: WorkshopService,
    private trainerService: TrainerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.workshopId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.workshopId;

    this.workshopForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      trainer: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['']
    });

    this.loadTrainers();

    if (this.isEditMode) {
      this.loadWorkshop();
    }
  }

  loadTrainers(): void {
    this.trainerService.getAllTrainers().subscribe({
      next: (res: any) => {
        this.trainers = res;
        console.log('Loaded trainers:', res);
      },
      error: (err: any) => {
        console.error('Failed to load trainers:', err);
      }
    });
  }

  loadWorkshop(): void {
    if (!this.workshopId) return;

    this.workshopService.getWorkshopById(this.workshopId).subscribe({
      next: (res: any) => {
        this.workshopForm.patchValue({
          title: res.title,
          date: res.date,
          trainer: res.trainer?._id || res.trainer, // Adjust as per your backend response
          price: res.price,
          description: res.description
        });
        console.log('Loaded workshop:', res);
      },
      error: (err: any) => {
        console.error('Failed to load workshop:', err);
      }
    });
  }

  onSubmit(): void {
    console.log('Submit button clicked');  // ADD THIS LINE!
  
    if (this.workshopForm.invalid) {
      console.warn('Form is invalid');
      return;
    }
  
    const formData = this.workshopForm.value;
    console.log('Submitting form data:', formData);  // You already have this
  
    if (this.isEditMode && this.workshopId) {
      console.log('Editing mode');  // ADD THIS LINE!
      this.workshopService
        .updateWorkshop(this.workshopId, formData)
        .subscribe({
          next: () => {
            console.log('Workshop updated');
            this.router.navigate(['/admin/workshops']);
          },
          error: (err: any) => {
            console.error('Update failed:', err);
          }
        });
    } else {
      console.log('Create mode');  // ADD THIS LINE!
      this.workshopService
        .createWorkshop(formData)
        .subscribe({
          next: () => {
            console.log('Workshop created');
            this.router.navigate(['/admin/workshops']);
          },
          error: (err: any) => {
            console.error('Creation failed:', err);
          }
        });
    }
  }
}  