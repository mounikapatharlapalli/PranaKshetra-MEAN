import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss'],
})
export class AboutusComponent {
  team = [
    {
      name: 'Yogi Arjun',
      role: 'Founder & Lead Yoga Instructor',
      photo: 'assets/images/team/arjun.jpg',
    },
    {
      name: 'Meera Sharma',
      role: 'Meditation Coach',
      photo: 'assets/images/team/meera.jpg',
    },
    {
      name: 'Rahul Verma',
      role: 'Nutrition & Satvik Food Expert',
      photo: 'assets/images/team/rahul.jpg',
    },
  ];
}
