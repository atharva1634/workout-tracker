import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { WorkoutService } from '../service/workout-service.service';

@Component({
  standalone: true,
  selector: 'app-display',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  workout: {
    username: string;
    workoutType: string;
    workoutMinutes: string;
  }[] = [];

  filteredWorkout: {
    username: string;
    workoutType: string;
    workoutMinutes: string;
  }[] = [];

  searchQuery: string = '';
  searchType: string = '';

  constructor(private router: Router, private workoutService: WorkoutService) {}

  ngOnInit() {
    this.workout = this.workoutService.getWorkouts();
    this.filteredWorkout = this.workout;
  }

  searchWorkouts() {
    const search = this.searchQuery.trim().toLowerCase();
    const type = this.searchType;

    this.filteredWorkout = this.workout.filter((workout) => {
      const matchesUsername = workout.username.toLowerCase().includes(search);
      const matchesWorkoutType = type === '' || workout.workoutType === type;
      return matchesUsername && matchesWorkoutType;
    });
  }

  getUniqueWorkoutTypes(): string[] {
    const types = new Set<string>();
    this.workout.forEach((workout) => {
      if (Array.isArray(workout.workoutType)) {
        workout.workoutType.forEach((type) => types.add(type));
      }
    });
    return Array.from(types);
  }

  navtoHome() {
    this.router.navigate(['/home']);
  }

  deleteWorkout(username: string, workoutType: string) {
    this.workoutService.deleteWorkout(username, workoutType);
    this.ngOnInit();
  }

  navtoStats(username: string) {
    this.router.navigate(['/stats'], { queryParams: { username: username } });
  }
}
