import { TestBed } from '@angular/core/testing';
import { WorkoutService } from '../service/workout-service.service';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty array if no workouts are saved', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(service.getWorkouts()).toEqual([]);
  });

  it('should return an empty array if workouts are corrupted', () => {
    spyOn(localStorage, 'getItem').and.returnValue('corrupted data');
    expect(service.getWorkouts()).toEqual([]);
  });

  it('should save workouts to localStorage', () => {
    const workouts = [
      { username: 'JohnDoe', workoutType: 'Cardio', workoutMinutes: '30' },
    ];
    spyOn(localStorage, 'setItem');
    service.saveWorkouts(workouts);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'workout',
      JSON.stringify(workouts)
    );
  });

  it('should add a workout to localStorage', () => {
    const workout = {
      username: 'JohnDoe',
      workoutType: 'Cardio',
      workoutMinutes: '30',
    };
    spyOn(service, 'getWorkouts').and.returnValue([]);
    spyOn(service, 'saveWorkouts');
    service.addWorkout(workout);
    expect(service.saveWorkouts).toHaveBeenCalledWith([workout]);
  });

  it('should update the workout in localStorage if it already exists', () => {
    const existingWorkout = {
      username: 'JohnDoe',
      workoutType: 'Cardio',
      workoutMinutes: '30',
    };
    const updatedWorkout = {
      username: 'JohnDoe',
      workoutType: 'Cardio',
      workoutMinutes: '45',
    };
    spyOn(service, 'getWorkouts').and.returnValue([existingWorkout]);
    spyOn(service, 'saveWorkouts');
    service.addWorkout(updatedWorkout);
    expect(service.saveWorkouts).toHaveBeenCalledWith([updatedWorkout]);
  });

  it('should delete a workout from localStorage', () => {
    const workout = {
      username: 'JohnDoe',
      workoutType: 'Cardio',
      workoutMinutes: '30',
    };
    spyOn(service, 'getWorkouts').and.returnValue([workout]);
    spyOn(service, 'saveWorkouts');
    service.deleteWorkout('JohnDoe', 'Cardio');
    expect(service.saveWorkouts).toHaveBeenCalledWith([]);
  });

  it('should handle deleting a workout that does not exist', () => {
    spyOn(service, 'getWorkouts').and.returnValue([]);
    spyOn(service, 'saveWorkouts');
    service.deleteWorkout('JohnDoe', 'Cardio');
    expect(service.saveWorkouts).toHaveBeenCalledWith([]);
  });

  it('should handle errors gracefully when reading from localStorage', () => {
    spyOn(localStorage, 'getItem').and.throwError('LocalStorage error');
    spyOn(console, 'error'); // Spy on console.error to verify error logging
    expect(service.getWorkouts()).toEqual([]);
    expect(console.error).toHaveBeenCalledWith(
      'Error reading from localStorage',
      jasmine.any(Error)
    );
  });

  it('should handle errors gracefully when saving to localStorage', () => {
    spyOn(localStorage, 'setItem').and.throwError('LocalStorage error');
    spyOn(console, 'error'); // Spy on console.error to verify error logging
    service.saveWorkouts([]);
    expect(console.error).toHaveBeenCalledWith(
      'Error saving to localStorage',
      jasmine.any(Error)
    );
  });
});
