import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Needed for *ngIf and common directives
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms'; // ✅ Forms
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // ✅ Navigation and routing
import { Course, CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-add-edit-course',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.scss']
})
export class AddEditCourseComponent implements OnInit {
  courseForm!: FormGroup;
  id: string | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    public router: Router,   // <-- Now it's public!
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.id;

    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      duration: ['', Validators.required],
      instructor: ['', Validators.required],
      status: ['Inactive', Validators.required],
      imageUrl: ['']
    });

    if (this.isEditMode) {
      this.courseService.getCourse(this.id!).subscribe((course) => {
        this.courseForm.patchValue(course);
      });
    }
  }

  onSubmit() {
    if (this.courseForm.invalid) return;

    const formData: Course = this.courseForm.value;

    if (this.isEditMode) {
      this.courseService.updateCourse(this.id!, formData).subscribe(() => {
        alert('✅ Course updated successfully!');
        this.router.navigate(['/admin/courses']);
      });
    } else {
      this.courseService.createCourse(formData).subscribe(() => {
        alert('✅ Course created successfully!');
        this.router.navigate(['/admin/courses']);
      });
    }
  }
  cancel() {
    this.router.navigate(['/admin/courses']);
  }
  
}
