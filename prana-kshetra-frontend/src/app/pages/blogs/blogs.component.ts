import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, RouterModule], // Required for *ngFor and routing!
  template: `
    <section class="blogs-container">
      <div class="blogs-header">
        <h1>Our Latest Blogs</h1>
        <p>Explore insightful articles and tips on Yoga, Meditation, and Wellness!</p>
      </div>

      <div class="blogs-grid">
        <div class="blog-card" *ngFor="let blog of blogs">
          <img [src]="blog.image" alt="{{ blog.title }}" class="blog-image" />
          <div class="blog-content">
            <h2>{{ blog.title }}</h2>
            <p>{{ blog.summary }}</p>
            <button class="read-more-btn">Read More</button>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./blogs.component.scss'] // ✅ Pointing to your CSS file
})
export class BlogsComponent {

  // ✅ blogs array inside the class
  blogs = [
    {
      title: '5 Yoga Poses for Beginners',
      summary: 'Start your yoga journey with these beginner-friendly poses that bring balance and flexibility.',
      image: 'https://i.pinimg.com/736x/36/d4/f8/36d4f81ceadcca936ce8b53769f0f54e.jpg'
    },
    {
      title: 'Meditation for Inner Peace',
      summary: 'Learn simple techniques to meditate and find your inner calm amidst life’s chaos.',
      image: 'https://i.pinimg.com/736x/9e/b2/6a/9eb26a5097f43c6dad372f7267ca1871.jpg'
    },
    {
      title: 'Healthy Satvik Diet Tips',
      summary: 'Discover Satvik diet principles that nourish your body and mind for holistic health.',
      image: 'https://i.pinimg.com/736x/45/63/32/456332c909f732da36000118c44943ab.jpg'
    },
    {
      title: '5 Yoga Poses for Beginners',
      summary: 'Start your yoga journey with these beginner-friendly poses that bring balance and flexibility.',
      image: 'https://i.pinimg.com/736x/58/1d/6d/581d6d87da3dd2f1fe632538254a6f8a.jpg'
    },
    {
      title: 'Meditation for Inner Peace',
      summary: 'Learn simple techniques to meditate and find your inner calm amidst life’s chaos.',
      image: 'https://i.pinimg.com/736x/00/df/5c/00df5c4a3eb7f7aac07a7897115b7552.jpg'
    },
    {
      title: 'Healthy Satvik Diet Tips',
      summary: 'Discover Satvik diet principles that nourish your body and mind for holistic health.',
      image: 'https://i.pinimg.com/736x/b2/c5/db/b2c5db8852124fd14e1b86c994494e52.jpg'
    }

  ];

}
