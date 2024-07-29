import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private storageKey = 'workout';

  constructor() {}

  getWorkouts(): any[] {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return [];
    }
  }

  saveWorkouts(workouts: any[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(workouts));
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  }

  addWorkout(workout: any): void {
    try {
      const workouts = this.getWorkouts();
      const index = workouts.findIndex(
        (w) =>
          w.username === workout.username &&
          w.workoutType === workout.workoutType
      );

      if (index !== -1) {
        // Update existing workout
        workouts[index] = workout;
      } else {
        // Add new workout
        workouts.push(workout);
      }

      this.saveWorkouts(workouts);
    } catch (error) {
      console.error('Error adding or updating workout', error);
    }
  }

  deleteWorkout(username: string, workoutType: string): void {
    try {
      let workouts = this.getWorkouts();
      workouts = workouts.filter(
        (workout) =>
          workout.username !== username || workout.workoutType !== workoutType
      );
      this.saveWorkouts(workouts);
    } catch (error) {
      console.error('Error deleting workout', error);
    }
  }
}
