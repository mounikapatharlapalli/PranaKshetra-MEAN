import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// ✅ Angular Core Modules
import { CommonModule } from '@angular/common';

// ✅ PrimeNG Modules
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-progressing',
  standalone: true,
  templateUrl: './progressing.component.html',
  styleUrls: ['./progressing.component.scss'],
  imports: [
    CommonModule,        // For *ngIf and *ngFor
    ProgressBarModule,   // For p-progressBar
    ButtonModule         // For pButton directive
  ]
})
export class ProgressingComponent {

  // ✅ Progress Percentages for Course and Diet (for p-progressBar)
  courseProgress = 75;
  dietProgress = 60;

  // ✅ YouTube Video Embed
  youtubeVideoUrl: SafeResourceUrl;
  rawYoutubeUrl = 'https://www.youtube.com/embed/brjAjq4zEIE?si=hL8p22ui6Q0pUVWP';

  // ✅ Yoga Sessions List
  yogaSessions = [
    { title: 'Session 1: Introduction to Yoga', completed: true },
    { title: 'Session 2: Pranayama Techniques', completed: true },
    { title: 'Session 3: Surya Namaskar', completed: false },
    { title: 'Session 4: Meditation Basics', completed: false },
  ];

  // ✅ Yoga Philosophies List
  philosophies = [
    'Ahimsa (Non-violence)',
    'Satya (Truthfulness)',
    'Asteya (Non-stealing)',
    'Brahmacharya (Moderation)',
    'Aparigraha (Non-possession)'
  ];

  // ✅ Diet Plan List
  dietPlan = [
    { meal: 'Breakfast', menu: 'Smoothie bowl with chia seeds and fruits' },
    { meal: 'Lunch', menu: 'Quinoa salad with fresh veggies' },
    { meal: 'Dinner', menu: 'Steamed vegetables with lentil soup' },
  ];

  // ✅ Course Progress Timeline Data
  courseProgressTimeline = [
    { name: 'Introduction' },
    { name: 'Warm-Up Exercises' },
    { name: 'Beginner Asanas' },
    { name: 'Advanced Asanas' },
    { name: 'Breathing Techniques' },
    { name: 'Meditation' },
    { name: 'Completion' }
  ];

  // ✅ Current Stage in Progress Timeline
  currentStageIndex = 0;

  constructor(private sanitizer: DomSanitizer) {
    // Embed YouTube video with sanitization
    this.youtubeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.rawYoutubeUrl);
  }

  // ✅ Navigate to the Next Stage in Progress Timeline
  goNext() {
    if (this.currentStageIndex < this.courseProgressTimeline.length - 1) {
      this.currentStageIndex++;
      this.updateCourseProgress();
    }
  }

  // ✅ Navigate to the Previous Stage in Progress Timeline
  goBack() {
    if (this.currentStageIndex > 0) {
      this.currentStageIndex--;
      this.updateCourseProgress();
    }
  }

  // ✅ Update the Course Progress Bar (optional: update based on stage)
  private updateCourseProgress() {
    const totalStages = this.courseProgressTimeline.length;
    const progressPercentage = Math.floor((this.currentStageIndex / (totalStages - 1)) * 100);
    this.courseProgress = progressPercentage;
  }

}
