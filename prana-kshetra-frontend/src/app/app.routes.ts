import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
// Guards
import { AuthGuard } from './services/auth.guard';

// Admin layout
import { AdminLayoutComponent } from './pages/admin/admin-layout/admin-layout.component';

// Direct Component Imports (for eager-loaded components)
import { CoursesComponent } from './pages/admin/courses/courses.component';
import { AddEditCourseComponent } from './pages/admin/courses/add-edit-course.component';

// Direct Component Imports (for eager-loaded components)
import { UsersComponent } from './pages/admin/users/users.component';
import { AddEditUserComponent } from './pages/admin/users/add-edit-user.component';

// ✅ Import your Trainers components for CRUD routes
import { TrainersComponent } from './pages/admin/trainers/trainers.component';
import { AddEditTrainerComponent } from './pages/admin/trainers/add-edit-trainer.component'; // Make sure this path is correct

export const routes: Routes = [
  // 👉 Public Routes
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'blogs', component: BlogsComponent },

  { path: 'aboutus', loadComponent: () => import('./pages/aboutus/aboutus.component')
    .then(m => m.AboutusComponent) },

  { path: 'courses', loadComponent: () => import('./pages/courses/courses.component')
    .then(m => m.CoursesComponent) },

  { path: 'workshops', loadComponent: () => import('./pages/workshops/workshops.component')
    .then(m => m.WorkshopsComponent) },

  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component')
    .then(m => m.ContactComponent) },

  { path: 'live', loadComponent: () => import('./pages/live/live.component')
    .then(m => m.LiveComponent) },
    {
      path: 'user/dashboard',
      loadComponent: () => import('./pages/users/user.component').then(m => m.UserComponent)
    },
    {
      path: 'progress/progressing',
      loadComponent: () => import('./pages/progress/progressing.component').then(m => m.ProgressingComponent)
    },
  // 👉 Admin Routes (Protected by AuthGuard)
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./pages/admin/dashboard/dashboard.component')
        .then(m => m.DashboardComponent) },

      // ✅ Courses Routes
      { path: 'courses', component: CoursesComponent },
      { path: 'courses/add', component: AddEditCourseComponent },
      { path: 'courses/edit/:id', component: AddEditCourseComponent },
 // ✅ Courses Routes
 { path: 'users', component: UsersComponent },
 { path: 'users/add', component: AddEditUserComponent },
 { path: 'users/edit/:id', component: AddEditUserComponent },

 { path: 'workshops', loadComponent: () => import('./pages/admin/workshops/workshops.component').then(m => m.WorkshopsComponent) },
 {
  path: 'workshops/add',
  loadComponent: () => import('./pages/admin/workshops/add-edit-workshop.component')
    .then(m => m.AddEditWorkshopComponent)
},
{
  path: 'workshops/edit/:id',
  loadComponent: () => import('./pages/admin/workshops/add-edit-workshop.component')
    .then(m => m.AddEditWorkshopComponent)
},

 
      // ✅ Trainers Routes (New)
      { path: 'trainers', component: TrainersComponent },                // List trainers
      { path: 'trainers/add', component: AddEditTrainerComponent },      // Add trainer
      { path: 'trainers/edit/:id', component: AddEditTrainerComponent }, // Edit trainer

      // Other Admin Features
      { path: 'users', loadComponent: () => import('./pages/admin/users/users.component')
        .then(m => m.UsersComponent) },

      { path: 'workshops', loadComponent: () => import('./pages/admin/workshops/workshops.component')
        .then(m => m.WorkshopsComponent) },

      { path: 'livesessions', loadComponent: () => import('./pages/admin/livesessions/livesessions.component')
        .then(m => m.LivesessionsComponent) },

      { path: 'revenue', loadComponent: () => import('./pages/admin/revenue/revenue.component')
        .then(m => m.RevenueComponent) },

      { path: 'support-requests', loadComponent: () => import('./pages/admin/support-requests/support-requests.component')
        .then(m => m.SupportRequestsComponent) },

      // Default admin redirect
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },

  // Wildcard route
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
