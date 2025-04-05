import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  adminName: string = 'Admin'; // You can fetch the actual name if you store it

  constructor(
    private router: Router,
    private route: ActivatedRoute // 👉 Inject ActivatedRoute for relative navigation
  ) {}

  ngOnInit(): void {
    // Optional: Validate admin session here
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found! Redirecting to login.');
      this.router.navigate(['/login']);
    }

    // Optional: Fetch admin user details if you want
    // this.adminName = '...' from localStorage/session/etc.
  }

  goTo(section: string): void {
    console.log(`Navigating to: ${section}`);

    // ✅ Navigate using relative path since you're already inside /admin/
    this.router.navigate([section], { relativeTo: this.route })
      .then(success => {
        if (!success) {
          console.error(`Failed to navigate to: ${section}`);
        }
      });
  }

}
