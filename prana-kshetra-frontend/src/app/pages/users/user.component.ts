import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  user = {
    name: 'Mounika Patharlapalli',
    email: 'mounikapatharlapalli@gmail.com',
    phone: '0898585949'
  };

  currentTab = 'dashboard';

  course = {
    name: '21-Day YOGA SADHANA BEGINNER',
    progressPercentage: 65,  // Update dynamically when backend is ready
    completedDays: 14,
    totalDays: 21
  };

  navigate(tab: string): void {
    this.currentTab = tab;
  }
}
