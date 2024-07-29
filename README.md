# Workout Tracker App

## Project Overview

This is a workout tracking single-page application (SPA) built with Angular. Users can track their daily workouts, including workout type and duration. The app allows users to add, view, and analyze their workouts with the help of charts. It also features filtering options to view specific workout data.

## Key Features

- **Add Workouts:** Users can add new workouts and store them in local storage.
- **View Workouts:** Users can view their recorded workouts.
- **Workout Statistics:** Visualize workout statistics using charts.
- **Filtering:** Filter workout data based on workout type.
- **Single Page Application:** Fast and efficient performance due to the Angular framework.

## Installation Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/workout-tracker.git
2. **Navigate to the Project Directory**

-cd workout-tracker
-npm install
-ng serve

**Access the Application**
Open your browser and go to http://localhost:4200.
    
# Workout Tracker App

## Usage

Once the application is running, you can:

- **Add new workouts** using the form provided.
- **View your workouts** on the main page.
- **See workout statistics** displayed in charts.
- **Filter workouts by type** using the dropdown menu.

## Testing

Unit testing has been performed on the `HomeComponent` and `WorkoutService`.

### Coverage Summary

- **Statements**: 80.64% (75/93)
- **Branches**: 70.58% (12/17)
- **Functions**: 75% (24/32)
- **Lines**: 80.68% (71/88)

### WorkoutService Tests

- **Creation of Service**
  - **Test**: Should be created.
  - **Description**: Verifies that the `WorkoutService` is properly instantiated.

- **Handling No Workouts in LocalStorage**
  - **Test**: Should return an empty array if no workouts are saved.
  - **Description**: Ensures that `getWorkouts` returns an empty array when no data is present in localStorage.

- **Handling Corrupted Workouts in LocalStorage**
  - **Test**: Should return an empty array if workouts are corrupted.
  - **Description**: Tests that `getWorkouts` returns an empty array if the data in localStorage is corrupted or malformed.

- **Saving Workouts to LocalStorage**
  - **Test**: Should save workouts to localStorage.
  - **Description**: Checks that `saveWorkouts` correctly stores an array of workouts in localStorage.

- **Adding a New Workout**
  - **Test**: Should add a workout to localStorage.
  - **Description**: Verifies that `addWorkout` adds a new workout and calls `saveWorkouts` with the updated list.

- **Updating an Existing Workout**
  - **Test**: Should update the workout in localStorage if it already exists.
  - **Description**: Ensures that an existing workout is updated properly in localStorage.

- **Deleting a Workout**
  - **Test**: Should delete a workout from localStorage.
  - **Description**: Tests that `deleteWorkout` removes a workout from localStorage.

- **Handling Deletion of Non-Existing Workout**
  - **Test**: Should handle deleting a workout that does not exist.
  - **Description**: Ensures that deleting a non-existing workout does not affect localStorage.

- **Error Handling When Reading from LocalStorage**
  - **Test**: Should handle errors gracefully when reading from localStorage.
  - **Description**: Tests that errors during reading from localStorage are handled gracefully and logged correctly.

- **Error Handling When Saving to LocalStorage**
  - **Test**: Should handle errors gracefully when saving to localStorage.
  - **Description**: Verifies that errors during saving to localStorage are handled and logged appropriately.

### HomeComponent Tests

- **Component Creation**
  - **Test**: Verify that the `HomeComponent` is created successfully.

- **Form Control Functionality**
  - **Test**: Ensure that form inputs update the component's state correctly when interacted with.

- **Adding a Workout**
  - **Test**: Confirm that `addWorkout` properly calls the `WorkoutService` to save a workout and clears the input fields afterward.

- **Navigation to View Component**
  - **Test**: Check that navigation to `/view` works as expected.

## Assumptions

- Added a **delete button** and a **view stats button** for each username to enhance user convenience.
- Included a **motivational background image** to provide a workout motivation experience.

## Conclusion

This Angular-based workout tracker app offers features such as adding workouts, viewing statistics, deleting workouts, and filtering data. The project was an enjoyable learning experience and provided valuable insights into Angular development and testing.

Thank you for checking out this project!
