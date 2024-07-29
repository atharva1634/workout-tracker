import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { WorkoutService } from '../service/workout-service.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    NgMultiSelectDropDownModule,
 
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  username: string = '';
  workoutType: string = '';
  workoutMinutes: string = '';

  constructor(private router: Router, private workoutService: WorkoutService) {}

  ngOnInit(): void {}

  Name(event: Event, field: string) {
    const inputElement = event.target as HTMLInputElement;
    if (field === 'username') {
      this.username = inputElement.value;
    }
  }

  Min(event: Event, field: string) {
    const inputMin = event.target as HTMLInputElement;
    if (field === 'workoutMinutes') {
      this.workoutMinutes = inputMin.value;
    }
  }

  Select(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.workoutType = selectElement.value;
  }

  addWorkout() {
    const workout = {
      username: this.username,
      workoutType: this.workoutType,
      workoutMinutes: this.workoutMinutes,
    };

    this.workoutService.addWorkout(workout);
    this.username = '';
    this.workoutType = '';
    this.workoutMinutes = '';
  }

  navtoView() {
    this.router.navigate(['/view']);
  }
}
