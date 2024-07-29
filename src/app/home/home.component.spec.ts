import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { WorkoutService } from '../service/workout-service.service';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let workoutService: jasmine.SpyObj<WorkoutService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const workoutServiceSpy = jasmine.createSpyObj('WorkoutService', [
      'addWorkout',
      'getWorkouts',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, NgMultiSelectDropDownModule,HomeComponent],
     
      providers: [
        { provide: WorkoutService, useValue: workoutServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    workoutService = TestBed.inject(
      WorkoutService
    ) as jasmine.SpyObj<WorkoutService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should update username on Name method call', () => {
    const event = { target: { value: 'testuser' } } as unknown as Event;
    component.Name(event, 'username');
    expect(component.username).toBe('testuser');
  });

  it('should handle empty username on Name method call', () => {
    const event = { target: { value: '' } } as unknown as Event;
    component.Name(event, 'username');
    expect(component.username).toBe('');
  });

  it('should update workoutMinutes on Min method call', () => {
    const event = { target: { value: '45' } } as unknown as Event;
    component.Min(event, 'workoutMinutes');
    expect(component.workoutMinutes).toBe('45');
  });

  it('should handle empty workoutMinutes on Min method call', () => {
    const event = { target: { value: '' } } as unknown as Event;
    component.Min(event, 'workoutMinutes');
    expect(component.workoutMinutes).toBe('');
  });

  it('should update workoutType on Select method call', () => {
    const event = { target: { value: 'Running' } } as unknown as Event;
    component.Select(event);
    expect(component.workoutType).toBe('Running');
  });

  it('should handle empty workoutType on Select method call', () => {
    const event = { target: { value: '' } } as unknown as Event;
    component.Select(event);
    expect(component.workoutType).toBe('');
  });

  it('should add workout and reset fields on addWorkout method call', () => {
    component.username = 'testuser';
    component.workoutType = 'Running';
    component.workoutMinutes = '45';

    component.addWorkout();

    expect(workoutService.addWorkout).toHaveBeenCalledWith({
      username: 'testuser',
      workoutType: 'Running',
      workoutMinutes: '45',
    });
    expect(component.username).toBe('');
    expect(component.workoutType).toBe('');
    expect(component.workoutMinutes).toBe('');
  });

  it('should handle adding workout with empty fields', () => {
    component.username = '';
    component.workoutType = '';
    component.workoutMinutes = '';

    component.addWorkout();

    expect(workoutService.addWorkout).toHaveBeenCalledWith({
      username: '',
      workoutType: '',
      workoutMinutes: '',
    });
    expect(component.username).toBe('');
    expect(component.workoutType).toBe('');
    expect(component.workoutMinutes).toBe('');
  });

  it('should navigate to /view on navtoView method call', () => {
    component.navtoView();
    expect(router.navigate).toHaveBeenCalledWith(['/view']);
  });
});
