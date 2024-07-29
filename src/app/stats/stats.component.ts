import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { WorkoutService } from '../service/workout-service.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit {
  workout: {
    username: string;
    workoutType: string;
    workoutMinutes: string;
  }[] = [];
  private chart: Chart | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private workoutService: WorkoutService
  ) {}

  ngOnInit() {
    this.workout = this.workoutService.getWorkouts();
    this.route.queryParams.subscribe((params) => {
      const username = params['username'];
      if (username) {
        this.workout = this.workout.filter(
          (item) => item.username.toLowerCase() === username.toLowerCase()
        );

        const labels = this.workout.map((item) => item.workoutType);
        const data = this.workout.map((item) =>
          parseInt(item.workoutMinutes, 10)
        );

        // Destroy the existing chart if it exists
        if (this.chart) {
          console.log('Destroying existing chart');
          this.chart.destroy(); // Ensure this is called
        }

        // Create a new chart
        this.chart = new Chart('myChart', {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: `Workout Minutes for ${username}`,
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    });
  }
  navtoHome() {
    this.router.navigate(['/home']);
  }
}
