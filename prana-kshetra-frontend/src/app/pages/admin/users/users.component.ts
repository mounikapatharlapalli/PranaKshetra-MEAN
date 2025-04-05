import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CommonModule } from '@angular/common';          // 🆕 Required for *ngFor
import { RouterModule } from '@angular/router';      
@Component({
  selector: 'app-users',
  standalone: true,                                      // 🆕 Standalone mode
  imports: [CommonModule, RouterModule],   
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: any[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.error = err.error?.message || 'Error fetching users';
        this.loading = false;
      }
    });
  }

  // Optional Delete Function
  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.users = this.users.filter(user => user._id !== userId);
          alert('User deleted successfully');
        },
        error: (err) => {
          console.error('Delete Error:', err);
          alert('Failed to delete user');
        }
      });
    }
  }
}
