import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { StatsComponent } from './stats/stats.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'view', component: ViewComponent },
  {path: 'stats', component: StatsComponent},
    {path: '**', component: HomeComponent}
    
];
