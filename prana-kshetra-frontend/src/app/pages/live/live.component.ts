import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-live',
  standalone: true,
  imports: [CommonModule], // CommonModule for basic Angular directives
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit, OnDestroy {

  // List of upcoming sessions
  upcomingSessions = [
    {
      id: 1,
      title: 'Morning Yoga for Beginners',
      date: '2025-03-30T07:00:00', // ISO format
      description: 'Kickstart your day with refreshing yoga!',
      instructor: 'Yogi Anjali',
      image: 'https://i.pinimg.com/736x/f0/a2/65/f0a2651080dcfc4cb53219faee9a4377.jpg'
    },
    {
      id: 2,
      title: 'Mindfulness Meditation',
      date: '2025-03-31T18:00:00',
      description: 'Relax and center your mind with guided meditation.',
      instructor: 'Master Raj',
      image: 'https://i.pinimg.com/736x/c2/1a/cb/c21acb1fe8e1000d1a6d2a9354fa80c8.jpg'
    }
  ];

  nextSession: any; // Holds the session for countdown
  countdown: string = ''; // Countdown string
  private countdownTimer: any; // Timer reference to clear onDestroy

  constructor() { }

  ngOnInit() {
    this.loadNextSession();
    this.startCountdown();
  }

  ngOnDestroy() {
    if (this.countdownTimer) {
      clearTimeout(this.countdownTimer);
    }
  }

  // Find the next session from the list (future sessions)
  loadNextSession() {
    const now = new Date().getTime();
    const futureSessions = this.upcomingSessions.filter(session => new Date(session.date).getTime() > now);
    
    // Sort future sessions by date ascending
    futureSessions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Set the closest upcoming session
    this.nextSession = futureSessions.length > 0 ? futureSessions[0] : null;
  }

  startCountdown() {
    if (!this.nextSession) {
      this.countdown = 'No upcoming sessions!';
      return;
    }

    const targetDate = new Date(this.nextSession.date).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        this.countdown = 'Live Now!';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;

      // Store the timer reference
      this.countdownTimer = setTimeout(updateCountdown, 1000);
    };

    updateCountdown();
  }

  // Simulate joining a session (replace this with real logic later)
  joinSession(session: any) {
    alert(`Joining "${session.title}" with ${session.instructor}!`);
    // You can add navigation or video call integration here.
  }

}
