import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Needed for *ngIf, *ngFor, ngClass
import { RouterModule, Router } from '@angular/router'; // ✅ Needed for routerLink
import { Course, CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  loading = true;

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses() {
    this.loading = true;
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error fetching courses', err);
        this.loading = false;
      }
    });
  }

  editCourse(course: Course) {
    this.router.navigate(['/admin/courses/edit', course._id]);
  }

  deleteCourse(id: string) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(id).subscribe(() => {
        this.getCourses();
      });
    }
  }
}
