import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-workshops',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.scss'],
})
export class WorkshopsComponent {
  workshops = [
    {
      title: 'Heal Yourself ',
      description: 'A guided meditation program to help you reconnect and heal your inner self.',
      image: 'https://i.pinimg.com/736x/17/de/2d/17de2d49651e79d5e018b6b61ac4d8ee.jpg',
      date: 'March 25, 2025',
      duration: '7 Days',
    },
    {
      title: 'Yoga Sadhana Bootcamp',
      description: 'An intensive bootcamp to deepen your yoga practice and build discipline.',
      image: 'https://i.pinimg.com/474x/cd/99/49/cd9949b812a731e9bb72c0e382cc4e76.jpg',
      date: 'April 10, 2025',
      duration: '14 Days',
    },
    {
      title: 'Satvik Food Diet',
      description: 'Discover the healing power of a Satvik diet, with recipes and guidance.',
      image: 'https://i.pinimg.com/736x/c5/7a/41/c57a41974fd7a4061e69f4ad7309386c.jpg',
      date: 'May 5, 2025',
      duration: '1 Month',
    },
    {
      title: '7 Day Health Challenge',
      description: 'Kickstart your wellness journey with this transformative 7-day challenge.',
      image: 'https://i.pinimg.com/736x/77/04/81/770481e6a1182edd654917a8a6f545fa.jpg',
      date: 'June 1, 2025',
      duration: '7 Days',
    },
  ];
}
