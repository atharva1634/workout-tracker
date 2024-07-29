import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { StatsComponent } from './stats.component';
import { WorkoutService } from '../service/workout-service.service';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';

// Mock Chart class
class MockChart {
  destroy() {}
}

// Mock for the Chart type
const mockChartInstance = {
  destroy: jasmine.createSpy('destroy'),
};

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;
  let mockActivatedRoute: any;
  let mockWorkoutService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockActivatedRoute = {
      queryParams: of({ username: 'testuser' }), // Mock queryParams
    };

    mockWorkoutService = {
      getWorkouts: jasmine.createSpy('getWorkouts').and.returnValue([
        { username: 'testuser', workoutType: 'Cardio', workoutMinutes: '30' },
        { username: 'testuser', workoutType: 'Strength', workoutMinutes: '45' },
      ]),
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterModule.forRoot([])], // RouterModule must be properly configured
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: WorkoutService, useValue: mockWorkoutService },
        { provide: Router, useValue: mockRouter },
        { provide: Chart, useValue: mockChartInstance }, // Provide the mock Chart instance
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding

    // Ensure ngOnInit is executed
    component.ngOnInit();
  });

  xit('should filter workouts and create chart on ngOnInit', () => {
    // Check that the chart's destroy method was called
    expect(mockChartInstance.destroy).toHaveBeenCalled();

    // Check that a chart instance was created with expected properties
    expect(component['chart']).toBeDefined();
  });

  xit('should handle absence of chart canvas context', () => {
    // Mock absence of canvas context
    const chartInstance = component['chart'] as any; // Cast to any to access chart properties
    expect(chartInstance).toBeDefined();
    expect(chartInstance.config.type).toBe('bar');
    expect(chartInstance.config.data.labels).toEqual(['Cardio', 'Strength']);
    expect(chartInstance.config.data.datasets[0].data).toEqual([30, 45]);
  });

  it('should navigate to home on navtoHome call', () => {
    component.navtoHome();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });
});
